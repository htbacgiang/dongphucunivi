# Privacy, Consent, and Provider Contract Gate

## Camera consent shown before capture

The UI explains that:
- The live camera video is sent to Decart AI for cloud processing.
- The selected garment reference image is also sent to Decart.
- Audio capture is disabled.
- The user may stop the session at any time.
- The output is AI-generated and may differ from the real garment.

The consent checkbox is unchecked by default. The Start button cannot request camera access until consent, garment image, and internal access code are present.

## Important public API terms reviewed on 2026-11-14

The Decart API Terms of Service (last updated July 26, 2026) contain material risks for UNIVI:

- Section 2.3 grants Decart a perpetual, irrevocable, worldwide, royalty-free, sublicensable license to use Inputs and Outputs for operation, improvement, development, and training; the text expressly mentions training AI models and reuse of Inputs/Outputs as training data.
- Section 4.2 says Inputs and Outputs are not confidential information.
- Section 4.3 requires the Developer to have all permissions needed to submit video, images, and a person's likeness.
- Section 8.1 says personal data is subject to the DPA. The Section 15.1 precedence clause lists API Terms above the DPA. Legal must analyze how the broad Input/Output license interacts with DPA obligations and obtain any necessary negotiated amendment or order form.

The public Privacy Policy also describes using live video recordings to provide and improve the platform and says personal data is retained until Decart deletes it or receives a valid deletion request, with certain exceptions. It does not promise immediate session-end deletion.

Sources:
- API Terms: https://docs.platform.decart.ai/resources/api-terms
- DPA: https://docs.platform.decart.ai/resources/dpa
- Privacy Policy: https://decart.ai/privacy-policy

## Mandatory restrictions

Until UNIVI Legal provides written approval:
- Keep `UNIVI_DECART_LEGAL_APPROVED=false`.
- Keep `UNIVI_LIVE_VTON_ENABLED=false`.
- Do not transmit real people's camera streams.
- Do not upload real UNIVI product photos, unreleased patterns, logos, designs, or confidential product information.
- Do not describe Decart as zero-retention, no-training, or confidential.
- Use only non-confidential test assets if any vendor-side test is separately approved.

A client-side checkbox alone is not sufficient to clear contractual or intellectual-property risks.

## Local application controls

- No `getUserMedia()` before affirmative consent and Start click.
- Audio disabled.
- Permanent API key remains server-side.
- Server mints a short-lived, model-scoped token only after feature, Legal, origin, and access-code checks.
- No image/video payload logging or database persistence.
- Stop disconnects the realtime client and stops camera and remote tracks.
- The app does not persist media in browser storage.

## Remaining Legal questions

1. Is the DPA executed and applicable to the exact API account and model?
2. Can Decart contractually exclude UNIVI Inputs/Outputs from training, product improvement, marketing, and reuse?
3. Can the API Terms be amended to preserve confidentiality and remove or limit the perpetual Input/Output license?
4. What retention and deletion SLA applies to live WebRTC video and uploaded references?
5. Where are live video and output processed, and which subprocessors can access them?
6. What is the supported deletion and incident-notification process?
