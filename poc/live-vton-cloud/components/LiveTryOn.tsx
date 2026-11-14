"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createDecartClient, models } from "@decartai/sdk";

type RealtimeClient = Awaited<ReturnType<ReturnType<typeof createDecartClient>["realtime"]["connect"]>>;
type Status = "idle" | "requesting-camera" | "connecting" | "applying" | "live" | "switching" | "stopping" | "error";

const MODEL_ID = "lucy-vton-3.5";
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const GARMENT_PROMPT = "Replace only the person's current upper-body garment with the exact garment shown in the reference image. Preserve the person's face, identity, hair, body shape, pose, hands, background and lighting. Reproduce the garment's original colors, logo placement, collar, sleeves, panels, patterns and fabric appearance as faithfully as possible. Do not invent, redesign, remove or reposition product details.";

const statusText: Record<Status, string> = {
  idle: "Chưa bắt đầu",
  "requesting-camera": "Đang xin quyền camera…",
  connecting: "Đang kết nối AI Cloud…",
  applying: "Đang thay áo bằng AI…",
  live: "Đang thử áo trực tiếp",
  switching: "Đang đổi mẫu áo…",
  stopping: "Đang kết thúc phiên…",
  error: "Có lỗi xảy ra",
};

export default function LiveTryOn() {
  const [consent, setConsent] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [garment, setGarment] = useState<File | null>(null);
  const [garmentPreview, setGarmentPreview] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLVideoElement>(null);
  const cameraRef = useRef<MediaStream | null>(null);
  const remoteRef = useRef<MediaStream | null>(null);
  const realtimeRef = useRef<RealtimeClient | null>(null);
  const activeRef = useRef(false);
  const startingRef = useRef(false);
  const attemptRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isBusy = status === "requesting-camera" || status === "connecting" || status === "applying" || status === "switching" || status === "stopping";

  const stopSession = useCallback(async () => {
    attemptRef.current += 1;
    const wasStarting = startingRef.current;
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setStatus("stopping");
    activeRef.current = false;
    const client = realtimeRef.current;
    realtimeRef.current = null;
    try { client?.disconnect(); } catch { /* best-effort cleanup */ }
    cameraRef.current?.getTracks().forEach((track) => track.stop());
    cameraRef.current = null;
    remoteRef.current?.getTracks().forEach((track) => track.stop());
    remoteRef.current = null;
    if (outputRef.current) outputRef.current.srcObject = null;
    setSessionSeconds(0);
    setStatus(wasStarting ? "stopping" : "idle");
  }, []);

  useEffect(() => {
    return () => {
      attemptRef.current += 1;
      activeRef.current = false;
      if (timerRef.current) clearInterval(timerRef.current);
      try { realtimeRef.current?.disconnect(); } catch { /* best-effort cleanup */ }
      cameraRef.current?.getTracks().forEach((track) => track.stop());
      remoteRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  useEffect(() => {
    if (!garment) {
      setGarmentPreview("");
      return;
    }
    const url = URL.createObjectURL(garment);
    setGarmentPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [garment]);

  const selectGarment = (file?: File) => {
    if (!file) return;
    setError("");
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Chỉ nhận ảnh JPEG, PNG hoặc WebP.");
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setError("Ảnh tham chiếu phải nhỏ hơn hoặc bằng 5 MB.");
      return;
    }
    setGarment(file);
    setNotice("Ảnh tham chiếu sẽ được gửi đến Decart khi bắt đầu hoặc áp dụng mẫu áo.");
  };

  const getProviderToken = async () => {
    const response = await fetch("/api/tokens", {
      method: "POST",
      cache: "no-store",
      headers: { "x-univi-poc-code": accessCode },
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.error || "Không thể cấp token AI.");
    const token = payload.apiKey || payload.token;
    if (typeof token !== "string" || !token) throw new Error("Provider trả về token không hợp lệ.");
    return token;
  };

  const startSession = async () => {
    if (startingRef.current || activeRef.current) return;
    if (!consent) { setError("Anh/chị cần đồng ý việc truyền video camera đến Decart AI trước."); return; }
    if (!accessCode.trim()) { setError("Nhập mã truy cập PoC nội bộ."); return; }
    if (!garment) { setError("Chọn ảnh áo UNIVI tham chiếu trước khi bắt đầu."); return; }
    if (!navigator.mediaDevices?.getUserMedia) { setError("Trình duyệt không hỗ trợ camera hoặc trang chưa chạy qua HTTPS/localhost."); return; }

    startingRef.current = true;
    const attemptId = ++attemptRef.current;
    setError("");
    setStatus("requesting-camera");
    try {
      const model = models.realtime(MODEL_ID);
      const camera = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { facingMode: "user", frameRate: model.fps, width: model.width, height: model.height },
      });
      if (attemptId !== attemptRef.current) {
        camera.getTracks().forEach((track) => track.stop());
        return;
      }
      cameraRef.current = camera;
      setStatus("connecting");
      const token = await getProviderToken();
      if (attemptId !== attemptRef.current) return;
      const client = createDecartClient({ apiKey: token });
      const realtime = await client.realtime.connect(camera, {
        model,
        mirror: "auto",
        onRemoteStream: (stream) => {
          if (attemptId !== attemptRef.current) {
            stream.getTracks().forEach((track) => track.stop());
            return;
          }
          remoteRef.current = stream;
          if (activeRef.current && outputRef.current) {
            outputRef.current.srcObject = stream;
            void outputRef.current.play().catch(() => undefined);
          }
        },
      });
      if (attemptId !== attemptRef.current) {
        realtime.disconnect();
        camera.getTracks().forEach((track) => track.stop());
        return;
      }
      realtimeRef.current = realtime;
      realtime.on("connectionChange", (state) => {
        if (state === "generating") setStatus("live");
        else if (state === "connecting" || state === "reconnecting") setStatus("connecting");
        else if (state === "error") setStatus("error");
      });
      realtime.on("error", () => {
        setError("Kết nối AI bị lỗi. Hãy kết thúc phiên và thử lại.");
        setStatus("error");
      });
      setStatus("applying");
      await realtime.set({ prompt: GARMENT_PROMPT, image: garment, enhance: false });
      if (attemptId !== attemptRef.current) {
        realtime.disconnect();
        camera.getTracks().forEach((track) => track.stop());
        remoteRef.current?.getTracks().forEach((track) => track.stop());
        return;
      }
      activeRef.current = true;
      if (remoteRef.current && outputRef.current) {
        outputRef.current.srcObject = remoteRef.current;
        await outputRef.current.play().catch(() => undefined);
      }
      setStatus("live");
      timerRef.current = setInterval(() => setSessionSeconds((s) => s + 1), 1000);
    } catch (err) {
      if (attemptId !== attemptRef.current) return;
      const message = err instanceof Error ? err.message : "Không thể khởi động phiên thử áo.";
      setError(message);
      setStatus("error");
      activeRef.current = false;
      try { realtimeRef.current?.disconnect(); } catch { /* best-effort cleanup */ }
      realtimeRef.current = null;
      cameraRef.current?.getTracks().forEach((track) => track.stop());
      cameraRef.current = null;
      remoteRef.current?.getTracks().forEach((track) => track.stop());
      remoteRef.current = null;
      if (outputRef.current) outputRef.current.srcObject = null;
    } finally {
      if (attemptId === attemptRef.current) startingRef.current = false;
      else {
        startingRef.current = false;
        setStatus("idle");
      }
    }
  };

  const applyNewGarment = async () => {
    if (!garment || !realtimeRef.current || !activeRef.current) return;
    setError("");
    setStatus("switching");
    try {
      await realtimeRef.current.set({ prompt: GARMENT_PROMPT, image: garment, enhance: false });
      setStatus("live");
    } catch {
      setError("Không đổi được áo. Hãy thử lại hoặc kết thúc phiên.");
      setStatus("error");
    }
  };

  const formatTime = (seconds: number) => String(Math.floor(seconds / 60)).padStart(2, "0") + ":" + String(seconds % 60).padStart(2, "0");

  return (
    <main className="shell">
      <header className="topbar">
        <a className="brand" href="#">UNIVI<span>LIVE TRY-ON</span></a>
        <span className="environment">INTERNAL CLOUD PoC</span>
      </header>
      <section className="intro">
        <p className="eyebrow">AI VIRTUAL FITTING ROOM</p>
        <h1>Thử áo UNIVI <em>trực tiếp</em></h1>
        <p className="lead">AI thay chiếc áo đang mặc bằng mẫu áo tham chiếu trên luồng camera trực tiếp. Đây là bản thử nghiệm nội bộ, không phải công cụ xác định kích cỡ hoặc độ vừa vặn.</p>
      </section>
      <section className="workspace">
        <div className="stage">
          <div className="stage-head"><div><span className="live-dot" />{statusText[status]}</div><span className="timer">{formatTime(sessionSeconds)}</span></div>
          <div className="video-frame">
            <video ref={outputRef} autoPlay playsInline muted aria-label="Video đã được AI thay trang phục" />
            {status !== "live" && status !== "switching" && (
              <div className="empty-stage"><div className="camera-symbol">◎</div><strong>Phòng thử đồ UNIVI</strong><span>Chọn ảnh áo, đồng ý xử lý Cloud và bắt đầu camera.</span></div>
            )}
            {status === "connecting" || status === "applying" ? <div className="processing">Đang kết nối GPU Cloud…</div> : null}
          </div>
          <div className="stage-foot"><span>Đầu ra AI từ Decart Lucy VTON 3.5</span><span>720p · Realtime</span></div>
          {error && <div className="error" role="alert">{error}</div>}
          {notice && <p className="notice">{notice}</p>}
        </div>
        <aside className="panel">
          <div className="step"><span>01</span><div><h2>Chọn mẫu áo</h2><p>Ảnh sản phẩm riêng, nền đơn giản, thấy rõ toàn bộ áo.</p></div></div>
          <button className="upload" type="button" onClick={() => inputRef.current?.click()}>
            {garmentPreview ? <img src={garmentPreview} alt="Ảnh tham chiếu áo đã chọn" /> : <span className="upload-plus">＋</span>}
            <span>{garment ? garment.name : "Chọn ảnh áo UNIVI"}</span>
            <small>JPG, PNG hoặc WebP · tối đa 5 MB</small>
          </button>
          <input ref={inputRef} className="hidden-input" type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => selectGarment(e.target.files?.[0])} />
          <div className="step"><span>02</span><div><h2>Đồng ý xử lý Cloud</h2><p>Video camera sẽ được truyền trực tiếp đến nhà cung cấp AI.</p></div></div>
          <div className="privacy-box">
            <p>Để tạo hình ảnh thử áo, video camera trực tiếp và ảnh áo tham chiếu sẽ được gửi đến Decart AI để xử lý trên GPU Cloud. Chính sách công khai của Decart cho biết Điều khoản API công khai của Decart hiện cấp cho họ quyền sử dụng Input/Output để vận hành, cải thiện và huấn luyện mô hình; dữ liệu Input/Output không được coi là thông tin mật. Chính sách quyền riêng tư cũng không cam kết xóa video ngay sau phiên. Vì vậy, chỉ được bật phiên thật sau khi UNIVI Legal thẩm định DPA và có phê duyệt hợp đồng/điều khoản bằng văn bản. Không tải ảnh sản phẩm bí mật hoặc dữ liệu khách hàng lên khi chưa được duyệt.</p>
            <label className="consent"><input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} /><span>Tôi hiểu video camera và ảnh áo tham chiếu sẽ được gửi đến Decart; tôi đã đọc các rủi ro sử dụng/lưu giữ dữ liệu và đồng ý cho phiên thử nghiệm này.</span></label>
          </div>
          <label className="field-label" htmlFor="access-code">Mã truy cập thử nghiệm nội bộ</label>
          <input id="access-code" className="access-input" type="password" autoComplete="off" value={accessCode} onChange={(e) => setAccessCode(e.target.value)} placeholder="Nhập mã do quản trị viên cung cấp" />
          <div className="actions">
            <button className="primary" type="button" disabled={isBusy || status === "live" || !consent || !garment || !accessCode.trim()} onClick={startSession}>Bắt đầu thử áo</button>
            <button className="secondary" type="button" disabled={status === "idle" || status === "stopping"} onClick={() => void stopSession()}>Kết thúc phiên</button>
          </div>
          {status === "live" && <button className="apply" type="button" onClick={applyNewGarment} disabled={!garment}>Áp dụng ảnh áo đang chọn</button>}
          <p className="cost">Chi phí nhà cung cấp công bố: 2 credits/giây ở 720p. Hãy kết thúc phiên ngay sau khi kiểm thử.</p>
        </aside>
      </section>
      <footer className="footer">PoC nội bộ · Không dùng dữ liệu người thật nếu chưa được người tham gia đồng ý và Legal phê duyệt.</footer>
    </main>
  );
}
