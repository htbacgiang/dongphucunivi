# UNIVI Live VTON Cloud PoC

This is an isolated proof of concept for live AI garment replacement using Decart Lucy VTON 3.6.

## Scope
- Real-time camera stream sent to Decart over WebRTC only after explicit informed consent.
- A user selects an approved garment reference image and receives the transformed remote video stream.
- No camera frames or user media are stored by this PoC.
- No production UI or existing website source is changed.

## Provider references
- Model: https://platform.decart.ai/models/lucy-vton
- Onboarding: https://api-onboarding.decart.ai/
- Vendor example source: https://github.com/DecartAI/tryon-examples/tree/main/examples/ecommerce

## Run
1. Use Node.js compatible with this repository's existing Next.js project.
2. Set DECART_API_KEY in the server environment only.
3. Install @decartai/sdk in the isolated PoC dependency manifest (do not change root package manifests).
4. Run the isolated app as documented in package.json.

The PoC must not claim privacy guarantees beyond the vendor policy and verified configuration. Legal review is required before real customer trials.
