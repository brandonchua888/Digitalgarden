---
title: Meeting transcriber
---

This garden has a built-in **in-person meeting transcriber and note-taker** at
[/transcribe](/transcribe).

Open it on a phone or laptop at the start of a meeting and it will:

- **Transcribe live speech** in the browser (Web Speech API — no server, no API keys)
- **Tag speakers** — list the attendees and tap whoever is talking
- **Capture action items and decisions** in dedicated lists while you listen
- **Autosave locally**, so an accidental refresh loses nothing
- **Export a Markdown note** ready to drop into this garden's `_notes/` folder

## Using it with AI recorder hardware (e.g. VIAIM RecDot)

AI note-taking earbuds like the [VIAIM RecDot](https://store.viaim.ai/products/viaim-recdot) pair well with this tool in two ways:

1. **As the microphone (live).** Pair the earbuds with your laptop or phone and select them
   as the input device — the transcriber page then benefits from their beamforming mics
   instead of your laptop mic.
2. **As an offline recorder (import).** Tap the red dot on the RecDot case to record the
   meeting without a phone, let the VIAIM Note app transcribe it (with speaker
   identification), export the transcript as **.txt**, and use the page's
   **"Import from a recorder"** section to pull it in. Speaker names and timestamps are
   detected automatically, and you can then add decisions/action items and export a
   garden-ready note.

VIAIM has no public developer API yet, so the export/import route is the reliable bridge.

## Fully offline mode (proof of concept)

[/transcribe-offline](/transcribe-offline) runs **Whisper directly in the browser** —
after a one-time model download (~40–80 MB, cached on the device) it records and
transcribes with no internet connection at all, on-device, including on an iPad
(Safari 16.4+). Results can be handed off to the main transcriber page with one tap
to add speakers, action items, and decisions before exporting.

Practical tips:

- Works best in Chrome, Edge, or Safari; most browsers need an internet connection for speech recognition.
- Put the device near the middle of the table for better pickup.
- Transcript lines are editable — click any line to fix mis-heard words before exporting.
