import { useState, useRef, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";

export default function VideoHero() {
  const [videoError, setVideoError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const videoSrc = "/video-univi.mp4";
  const fallbackImage = "/images/farm-fallback.jpg";

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => setVideoError(true));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current) {
          if (entry.isIntersecting && isPlaying) {
            videoRef.current.play().catch(() => setVideoError(true));
          } else {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []); // Removed isPlaying dependency

  return (
    <>
      <section
        className="bg-gray-900 text-white py-12 relative"
        aria-labelledby="video-hero-heading"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <p
                lang="vi"
                className="text-base font-bold uppercase tracking-widest text-blue-300"
              >
                ĐỒNG PHỤC UNIVI
              </p>
              <h2
                id="video-hero-heading"
                className="text-2xl md:text-3xl font-bold text-white leading-tight"
              >
                XƯỞNG SẢN XUẤT KHÉP KÍN
              </h2>
              <p
                lang="vi"
                className="text-gray-300 text-base md:text-lg leading-relaxed"
              >
                Tại 𝐔𝐧𝐢𝐯𝐢, chúng tôi sở hữu các xưởng may hiện đại với tổng diện
                tích lên đến 2000m2 có khả năng sản xuất lên đến 100.000
                sản phẩm/tháng, đảm bảo tiến độ nhanh chóng với các đơn hàng đồng
                phục số lượng lớn cho các chuỗi phòng tập hay đội nhóm thể thao
                trên toàn quốc.
                <div>
                  <span className="text-red-500 font-semibold">* </span>
                  <i className="font-bold">
                    Phân xưởng sản xuất số 03 tại Hải Dương
                  </i>
                </div>
              </p>
            </div>
            <div className="relative max-w-screen-xl mx-auto rounded-lg shadow-lg overflow-hidden">
              <div className="relative w-full rounded-lg overflow-hidden aspect-w-16 aspect-h-9">
                {videoError ? (
                  <>
                    <Image
                      src={fallbackImage}
                      alt="Xưởng sản xuất đồng phục Univi tại Hải Dương"
                      fill
                      style={{ objectFit: "cover" }}
                      quality={75}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800 bg-opacity-75">
                      <p className="text-white">
                        Không thể tải video. Vui lòng thử lại.
                      </p>
                      <button
                        onClick={() => {
                          setVideoError(false);
                          if (videoRef.current) {
                            videoRef.current.load();
                            videoRef.current.play().catch(() =>
                              setVideoError(true)
                            );
                          }
                        }}
                        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                      >
                        Thử lại
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="relative">
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      src={videoSrc}
                      autoPlay
                      muted={isMuted}
                      loop
                      playsInline
                      preload="metadata"
                      tabIndex={0}
                      title="Video giới thiệu xưởng sản xuất Univi"
                      aria-label="Video giới thiệu xưởng sản xuất Univi"
                      onError={() => setVideoError(true)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          togglePlay();
                        }
                      }}
                    />
                    <div className="absolute bottom-4 right-4 flex space-x-2">
                      <button
                        onClick={togglePlay}
                        className="bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full"
                        aria-label={
                          isPlaying ? "Tạm dừng video" : "Phát video"
                        }
                        aria-pressed={isPlaying}
                      >
                        {isPlaying ? "❚❚" : "▶"}
                      </button>
                      <button
                        onClick={toggleMute}
                        className="bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full"
                        aria-label={
                          isMuted ? "Bật âm thanh" : "Tắt âm thanh"
                        }
                        aria-pressed={!isMuted}
                      >
                        {isMuted ? "🔇" : "🔊"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}