# UNIVI Live Virtual Try-On — Cloud PoC

Isolated Next.js proof of concept for replacing the current upper-body garment in a live camera stream using Decart Lucy Virtual Try-On 3.5 over WebRTC.

## What it does

- Requires a clear consent checkbox before asking the browser for camera access.
- Captures video only; microphone/audio is disabled.
- Sends the live camera stream and selected garment reference to Decart only after user action and server-side approval gates.
- Renders the transformed remote video stream.
- Lets the user switch garment references during a live session.
- Stops camera tracks and disconnects the remote session on Stop, errors, or component teardown.
- Keeps the permanent API key server-side.
- Does not persist camera frames, videos, or generated output.

## Important provider contract blocker

The public Decart API Terms currently grant broad rights to use Inputs/Outputs for operation, improvement, development, and model training; they also state that Inputs/Outputs are not confidential. The public Privacy Policy describes retention until provider deletion or a valid deletion request, subject to exceptions.

Therefore this PoC is **disabled for real Cloud sessions by default**. Do not use real UNIVI proprietary product assets or any person's video until UNIVI Legal has reviewed the API Terms/DPA and approved the arrangement in writing. A checkbox cannot replace that contractual review.

See:
- `PROVIDER_NOTES.md`
- `PRIVACY_AND_CONSENT.md`

## Run locally

From this folder:

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

Open http://localhost:3020

The UI can load without provider credentials, but live sessions remain blocked by default.

## Environment variables

- `DECART_API_KEY`: Decart permanent key, server-side only.
- `APP_ORIGIN`: exact app origin, no trailing slash.
- `UNIVI_LIVE_VTON_ENABLED`: must remain false until an operator intentionally enables the approved test.
- `UNIVI_DECART_LEGAL_APPROVED`: must remain false until written Legal approval is recorded.
- `UNIVI_POC_ACCESS_CODE`: internal access code; use at least 24 random characters.

The real Cloud route requires BOTH approval flags and the access code. Never add secrets to source control or `NEXT_PUBLIC_*`.

## Model and billing

The official model page currently shows `lucy-vton-3.5` and a public 720p price of 2 credits/second. Verify current pricing in the account before any live test.

## Limitations

- AI output can alter logo artwork, wording, colors, patterns, collar, seams, and sleeve details.
- The output is a visual try-on, not a size recommendation or fit guarantee.
- No real provider session, build, or browser-device benchmark is claimed by this source commit.
- Rate limiting in this PoC is process-local and not suitable for public production deployment.
