# Architecture — UNIVI Live VTON Cloud PoC

## Runtime flow

Browser consent -> Start click -> getUserMedia (video only) -> short-lived Decart client token -> Decart Lucy Virtual Try-On 3.5 over WebRTC -> transformed remote MediaStream -> output video element.

The model ID is `lucy-vton-3.5` according to the current official model page reviewed on 2026-11-14. Do not use the earlier unverified 3.6 or latest aliases.

## Garment replacement

- User selects a reference image (JPEG/PNG/WebP, max 5 MB).
- The image is previewed locally and is not uploaded merely by selecting it.
- After consent and Start, the app sends the camera stream to Decart.
- The selected garment File and product-specific prompt are passed atomically with `realtimeClient.set({ prompt, image, enhance: false })`.
- The same `set()` flow supports garment switching in-session.
- The AI output may alter product details; human Product/Studio inspection is required.

## Token security

- Permanent `DECART_API_KEY` exists only server-side.
- Server creates a client token scoped to `lucy-vton-3.5` and a 300-second expiry.
- Token route requires exact Origin, same-origin fetch metadata, internal access code, and process-local rate limiting.
- Token response uses no-store cache headers.
- Real token issuance is server-blocked unless both `UNIVI_LIVE_VTON_ENABLED=true` and `UNIVI_DECART_LEGAL_APPROVED=true`.

## Camera and stream lifecycle

- No camera access before explicit consent and user click.
- No microphone/audio track.
- Stop disconnects provider client, stops every local camera track, stops remote tracks, and clears the output element.
- Stopping during startup invalidates the attempt; any stream/client arriving afterward is immediately disconnected/stopped.
- Cleanup also runs on component unmount.

## Data minimization

- No database persistence of camera or output media.
- No browser storage for images/video.
- No payload logging.
- Do not claim that the provider does not retain, train on, or reuse Inputs/Outputs; public API Terms and privacy policy currently disclose broad rights and retention conditions.

## Isolation

- All code resides under `poc/live-vton-cloud/`.
- Does not modify the existing website source, root package manifests, production UI, or Sprint 03E 2.5D prototype.
- This is not production-ready. Rate limiting is process-local and requires a shared distributed control before public deployment.
