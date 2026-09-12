# Healthi Booth Console — AI demo interface

A runnable demo screen for the Healthi booth: the tech-style console a guest sees while
taking the contactless wellness check. Built to be shown live on a booth screen or
tablet, and to be captured as stills for decks, social and print.

Live: https://claude.ai/code/artifact/32e5558f-5c30-46fb-854f-c424cedb11e0

## Session flow

The console walks the four TCM examinations (望闻问切) in Healthi's operational order,
voice first:

| # | Step | Modality | On screen |
|---|------|----------|-----------|
| 01 | 闻 Listen · Voice check | Vocal biomarker AI — **primary** | 3-minute capture, live waveform, signal / noise / pace meters |
| 02 | 望 Look · Face scan | rPPG, camera only | 30-second capture, alignment oval, ROI ticks, blood volume pulse trace |
| 03 | 问 Ask · Six questions | Tablet | Not part of this demo screen |
| 04 | 切 Feel · Advocate follow-up | Human | Handover panel on the snapshot |

## Screens and controls

- **Attract** — resting state. Headline, the three promises, the FDA line and footnote,
  and the start button.
- **Voice** — live waveform and capture quality, counting down from 3:00.
- **Face scan** — alignment view and pulse trace, counting down from 30 seconds.
- **Snapshot** — three pillars (Mental and Social leading to Physical), advocate handover.

Footer chips jump straight to any screen — useful when demoing to a visitor who only has
a moment. The speed chip toggles between **Demo ×6** (a full run in about 35 seconds) and
**Real time** (the true 3:00 + 0:30 protocol). All figures are demo data and the header
says so.

URL parameters, for pinning a screen or grabbing a still:

- `?state=attract|voice|scan|snapshot` — open directly on that screen
- `?still=1` — freeze the animation on a representative frame (used for the exports)

## Exported stills

In `exports/`, rendered at 2× for print and screen:

| File | Ratio | Pixels |
|---|---|---|
| `booth-attract-16x9.png` | 16:9 | 3840 × 2160 |
| `booth-attract-1x1.png` | 1:1 | 2160 × 2160 |
| `booth-voice-16x9.png` | 16:9 | 3840 × 2160 |
| `booth-facescan-16x9.png` | 16:9 | 3840 × 2160 |
| `booth-snapshot-16x9.png` | 16:9 | 3840 × 2160 |
| `booth-snapshot-4x3.png` | 4:3 | 2880 × 2160 |
| `booth-snapshot-1x1.png` | 1:1 | 2160 × 2160 |

The layout reflows at each ratio rather than cropping: at 16:9 it runs three columns, at
4:3 the session rail moves to a top strip, at 1:1 the indicators drop to a bottom row.
To re-render after an edit, open the file at the target viewport with `?state=…&still=1`
and screenshot at `deviceScaleFactor: 2`.

## Copy compliance

Checked against `healthi-face-scan-copy` and `healthi-credentials`:

- Voice is named before and above the face scan on every screen, and carries the
  "primary modality" flag.
- Face scan is **30 seconds**, voice check is **3 minutes**, everywhere.
- The face-scan vendor is never named — the copy says "rPPG technology".
- Wellness lane only: "wellness indicators", "blood pressure trend (wellness estimate)",
  "worth paying attention to". No disease names, thresholds or clinical prompts.
- The FDA line uses the approved wording with its required footnote, sits at about a
  third of the headline size, and appears **only on the attract screen** — which shows no
  readings at all. Blood pressure, blood oxygen and stress never share a panel with it.
- "For wellness awareness only. Not a medical diagnosis." on the snapshot, plus the
  longer non-medical-device wording under the indicator rail.
- Both taglines run together in the footer.
- Award wording is the approved short form.

## Before using this in front of guests

- Swap the placeholder sound-bar mark in the header for the official teal Healthi logo
  from healthi.my. The SVG is inline near the top of the body.
- Replace the demo figures with a real captured session, or keep the "example session"
  badge visible so nothing reads as a guest's own numbers.
- Poppins, IBM Plex Sans and IBM Plex Mono load from Google Fonts, so the booth screen
  needs network access — or self-host the three faces if the venue Wi-Fi is unreliable.
