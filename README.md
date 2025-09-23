# True-view-camera — Inclusive Camera App (scaffold)

This repository is a scaffold for an inclusive mobile camera app focused on better results for darker skin tones and on-device-first privacy. It uses open-source building blocks and a small server to run heavier AI tasks.

High-level features
- Skin-tone aware capture pipeline (adaptive exposure, local tone mapping, color transforms).
- Auto-capture when person/object is in-focus (face/object detection + subtle movement or countdown).
- HDR-style capture via exposure bracketing when supported or simulated computationally.
- Image & video generation from text/voice/image prompts using open-source models (Stable Diffusion / diffusion-based video pipelines).
- AI editing: background replacement, border designer, retouching, filters.
- Easy sharing to major social platforms.
- Accessibility & privacy considerations.

Quick start (recommended)
1. Choose mobile runtime: Expo (fast iteration) or React Native + VisionCamera (native frame processors).
2. Copy environment variables into .env from .env.example.
3. Start the mobile app: `npm run start`
4. Start the server (optional for heavy model inference): `npm run server`

Privacy & Ethics
- Heavy AI inference should be opt-in; allow local-only or hosted inference choices.
- Provide clear permissions and explain how images/videos and prompts are used, stored, and shared.
