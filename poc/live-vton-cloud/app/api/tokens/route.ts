import { createDecartClient } from "@decartai/sdk";
import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MODEL = "lucy-vton-3.5";
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;
const attempts = new Map<string, { count: number; resetAt: number }>();

function constantTimeMatch(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, {
    status,
    headers: { "Cache-Control": "no-store, max-age=0", Pragma: "no-cache" },
  });
}

export async function POST(request: Request) {
  if (process.env.UNIVI_LIVE_VTON_ENABLED !== "true") {
    return jsonError("Live VTON PoC is disabled by the server.", 403);
  }

  const configuredOrigin = process.env.APP_ORIGIN;
  const requestOrigin = request.headers.get("origin");
  const expectedOrigin = configuredOrigin || new URL(request.url).origin;
  if (!requestOrigin || requestOrigin !== expectedOrigin) {
    return jsonError("Invalid request origin.", 403);
  }
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite && fetchSite !== "same-origin" && fetchSite !== "none") {
    return jsonError("Cross-site requests are not allowed.", 403);
  }

  const expectedCode = process.env.UNIVI_POC_ACCESS_CODE;
  const suppliedCode = request.headers.get("x-univi-poc-code") || "";
  if (!expectedCode || !suppliedCode || !constantTimeMatch(expectedCode, suppliedCode)) {
    return jsonError("Invalid PoC access code.", 401);
  }

  const ip = request.headers.get("x-real-ip") || "unknown";
  const now = Date.now();
  const current = attempts.get(ip);
  if (current && current.resetAt > now && current.count >= MAX_REQUESTS_PER_WINDOW) {
    return jsonError("Too many token requests. Try again later.", 429);
  }
  if (!current || current.resetAt <= now) attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
  else current.count += 1;

  const apiKey = process.env.DECART_API_KEY;
  if (!apiKey) return jsonError("Decart provider is not configured.", 503);

  try {
    const client = createDecartClient({ apiKey });
    const token = await client.tokens.create({ expiresIn: 300, allowedModels: [MODEL] });
    return NextResponse.json(token, {
      headers: { "Cache-Control": "no-store, max-age=0", Pragma: "no-cache" },
    });
  } catch {
    return jsonError("Could not create a temporary provider token.", 502);
  }
}
