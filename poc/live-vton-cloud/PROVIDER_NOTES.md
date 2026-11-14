# Provider Integration Notes

Vendor official model page: https://platform.decart.ai/models/lucy-vton
Official onboarding: https://api-onboarding.decart.ai/
Official source example: https://github.com/DecartAI/tryon-examples/tree/main/examples/ecommerce

Verified public integration pattern:
- Browser captures a MediaStream after user action.
- Server creates short-lived client token from DECART_API_KEY.
- Browser connects using @decartai/sdk and models.realtime("lucy-vton-latest").
- onRemoteStream receives the transformed MediaStream.
- Garment image can be sent with setImage(imageBlob, {prompt, enhance:false}).
- disconnect() ends realtime client.

Use exact installed SDK TypeScript types and current vendor docs; do not guess method signatures.

Pricing displayed on vendor model page at review time:
- realtime 720p: 2 credits/second
- fast realtime 720p: 4 credits/second (not enabled by default)

Provider privacy policy reviewed: https://decart.ai/privacy-policy (last-updated date shown by vendor page: 2026-08-20). The public policy is not a zero-retention contract. Legal review is mandatory.
