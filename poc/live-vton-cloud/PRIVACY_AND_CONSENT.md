# Privacy and Consent

## Consent text shown before camera activation
"To show you wearing this UNIVI garment, your live camera video will be transmitted to Decart AI and processed on its cloud GPU service. UNIVI does not store your camera video in this PoC. Do not continue unless you agree to this transfer and processing. You can stop the session at any time."

The consent must be unchecked by default and separated from a Start button. Consent and browser camera permission are separate requirements.

## Data minimization
- No database writes for camera media.
- No image/video payload logging, analytics, session recording, or error attachment.
- Do not use camera media for training or marketing.
- Keep only non-content operational counters if needed (session duration, connection outcome, model, approximate latency).
- Do not retain media in browser storage, IndexedDB, localStorage, or sessionStorage.

## Vendor diligence — NOT YET CLEARED
Decart's public privacy policy describes collection/use of inputs and outputs for service operation, but public policy review alone does not establish a zero-retention or no-training contract.
Before real people/customer trials, Legal must confirm:
- controller/processor roles and DPA where applicable
- retention/deletion period for video, frames, and outputs
- training and model-improvement use/opt-out
- subprocessors and data locations/transfers
- security safeguards and incident process
- age restrictions and lawful basis/consent wording
- deletion and rights request workflow

No zero-retention claim is authorized until contractually verified.
