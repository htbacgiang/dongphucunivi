# Provider Integration Notes

## Current model verified from the official model page

- Provider: Decart AI
- Product: Lucy Virtual Try-On
- Current model ID shown by official documentation at review time: `lucy-vton-3.5`
- Transport: realtime WebRTC video stream
- Garment reference: prompt and image passed atomically with `realtimeClient.set({ prompt, image })`
- Current public 720p price shown: 2 credits per second. Prices and credit consumption can change; re-check the billing page before a test.

Official sources:
- Model page: https://platform.decart.ai/models/lucy-vton
- Authentication and client tokens: https://docs.platform.decart.ai/getting-started/authentication
- Reference image guide: https://docs.platform.decart.ai/models/realtime/reference-images
- Official example repository (MIT): https://github.com/DecartAI/tryon-examples

## Authentication implementation

- Permanent `DECART_API_KEY` is held only on the server.
- The server creates a short-lived client token scoped to `lucy-vton-3.5`, with a 300-second expiry.
- Browser uses that temporary token to connect.
- Token responses are non-cacheable.
- Internal PoC access code, same-origin validation, and a server-side feature flag are required.
- An additional Legal approval flag must be enabled before the server issues a real token.

## Critical legal and data-use finding — BLOCKER

The public Decart API Terms of Service (last updated July 26, 2026) currently state:

1. Section 2.3 grants Decart a perpetual, irrevocable, worldwide, royalty-free, sublicensable license to use, reproduce, modify, adapt, distribute, publicly perform/display Inputs and Outputs for service operation, product improvement, and development. It expressly says this may include training AI models and reusing Inputs/Outputs in training data.
2. Section 4.2 says Input and Output are not considered confidential information.
3. Section 4.3 requires the Developer to have all necessary rights and permissions for images, video, and likenesses submitted.
4. Section 8.1 says personal data is processed subject to the DPA. The agreement's precedence clause in Section 15.1 places the API Terms above the DPA. Legal must reconcile the license and privacy clauses and obtain any required written amendments/order form.
5. The public Privacy Policy states that live video recording may be processed to provide, improve, and develop the platform and describes retention until Decart deletes data or receives a valid deletion request, with exceptions.

Official sources:
- API Terms: https://docs.platform.decart.ai/resources/api-terms
- DPA: https://docs.platform.decart.ai/resources/dpa
- Privacy Policy: https://decart.ai/privacy-policy

**Do not upload real UNIVI product reference assets, unreleased designs, employee/customer camera streams, or any confidential material until Legal approves the applicable contract and DPA in writing.** A UI consent checkbox does not resolve UNIVI's IP, confidentiality, or processor-contract obligations.

## Implementation status

The application and integration code are an isolated PoC. A real session remains server-blocked unless BOTH:
- `UNIVI_LIVE_VTON_ENABLED=true`
- `UNIVI_DECART_LEGAL_APPROVED=true`

Do not switch either flag on to bypass Legal review.
