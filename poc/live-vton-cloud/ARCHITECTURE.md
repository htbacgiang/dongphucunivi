# Architecture — Live VTON Cloud PoC

## Flow
Browser consent screen -> user gesture -> getUserMedia -> Decart Lucy VTON 3.6 realtime WebRTC -> remote transformed MediaStream -> output video.

## Token security
- Permanent DECART_API_KEY stays server-side.
- Browser requests a short-lived client token from a same-origin server route.
- The token route must enforce Origin/CSRF checks, rate limiting, and non-cacheable responses.
- Never include secrets in NEXT_PUBLIC_* variables, logs, source control, or client bundles.

## Camera lifecycle
- No getUserMedia before affirmative consent and a Start click.
- Explicitly state that the live camera stream is transmitted to Decart's GPU Cloud.
- Stop must disconnect the realtime client and stop every camera track.
- Cleanup must also run on unmount, tab close, and connection failure.
- Do not persist the camera stream or transformed stream.

## Garment reference
- Only approved product reference images may be presented as UNIVI products.
- Start with one clean product-only top image.
- Keep prompt conservative and product-specific; AI output is not guaranteed to preserve exact branding.
- Product/Studio must visually inspect logo, color, panels, collar, sleeves, and pattern.

## Failures
- No silent local 2.5D fallback.
- On provider or network failure, stop or pause visibly and offer explicit retry.
- Never label local input video as successful AI output.

## Scope
- Isolated PoC only.
- Do not alter existing production pages, package manifests, dependencies, Next config, or Sprint 03E 2.5D prototype.
