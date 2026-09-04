# Draco AI V3

Draco AI V3 is a four-week interactive AI literacy course for young learners. The production curriculum contains only V3 content:

1. How language models work
2. Prompt engineering
3. Multimodal AI
4. Agent engineering and safety

The Chinese production course has 28 days, 420 assessments, 28 interactive labs, 28 open practices, and eight core videos. It does not require an AI API key.

## Language Routes

- Chinese course: `http://localhost:3000/zh/`
- English course: `http://localhost:3000/en/`
- `/` defaults to Chinese.
- `v3/`: current Chinese production curriculum.
- `v3-en/`: current English curriculum source.
- Chinese video plan: two videos per week. Week 1 Day 1 retains the externally produced Chinese history film; the other seven videos are generated with Remotion.
- English video plan: two independently written and rendered Remotion videos per week. English does not reuse the Chinese history film.
- Both courses contain 28 days, 420 assessments, 28 interactive labs, 28 open practices, and eight core videos.
- The shared engine localizes navigation, glossary, lesson feedback, interactive labs, practice self-checks, and video controls by route.

Do not import `archive_v1` into production. It is repository history, not part of V3.

## Run Locally

Prerequisite: Node.js.

1. Install dependencies:
   ```powershell
   npm install
   ```
2. Run the app:
   ```powershell
   npm run dev
   ```

The development server runs at `http://localhost:3000/`.

## Build

```powershell
npm run build
```

## Core Videos

The bilingual source of truth is `video/core-video-content.json`.

Generate Chinese and English speech, captions, and timing manifests:

```powershell
npm run video:tts:core
```

Render the seven Chinese Remotion videos and eight English Remotion videos:

```powershell
npm run video:render:core
```

Final media paths:

- Chinese Remotion: `public/video/zh/`
- English Remotion: `public/video/en/`
- Retained Chinese history film: `public/video/week1/day1-short-zh.mp4`

Generated media is ignored by default. The final reviewed MP4 files in this branch are force-tracked so a checkout can run the course without rendering videos again.
