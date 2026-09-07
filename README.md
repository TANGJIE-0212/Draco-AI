# Draco AI V3

Draco AI V3 is a four-week interactive AI literacy course for young learners. The production curriculum contains only V3 content:

1. How language models work
2. Prompt engineering
3. Multimodal AI
4. Agent engineering and safety

The Chinese production course has 28 days, 420 assessments, 28 interactive labs, 28 open practices, and eight core videos. It does not require an AI API key.

## Language Routes

- Chinese course: `http://localhost:3000/cn/`
- English course: `http://localhost:3000/en/`
- `/` defaults to Chinese.
- `/zh/` remains a legacy alias for the Chinese course; the language switch uses `/cn/` and `/en/`.
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

## Daytoy deployment

Run `npm run build:pages` to build for `https://daytoy.online/draco-ai/`.
Copy the generated `dist` contents into the Daytoy site's `draco-ai` directory.
The build includes real `cn/index.html`, `en/index.html`, and legacy `zh/index.html` entry points so
GitHub Pages can serve direct links and refreshes without an SPA fallback.
The Chinese entry point is `https://daytoy.online/draco-ai/cn/`.
The English entry point is `https://daytoy.online/draco-ai/en/`.
The root `https://daytoy.online/draco-ai/` defaults to Chinese, and `/draco-ai/zh/` remains a Chinese alias.
Local development uses `/cn/` and `/en/`, with `/zh/` retained for older links.
The world map uses a vertical path. Its progress badge shows the next learning
day (for example, `Week 2 · Day 3`) and shows `Quest complete!` after all 28 days.
Completed lessons are saved in this browser's local storage and shared between
the English and Chinese routes; progress is not synced across devices.
The unlock-all testing shortcut is only rendered by the development server.
The dragon opening stays visible for three seconds after its image loads.

## AI Glossary

The shared bilingual glossary lives in `glossary.ts` and `glossary-models.ts`,
with its schema and eight categories in `glossary-types.ts`. It contains 103
paired entries: all 100 records from WaytoAGI's **80+AI名词解释** reference,
with three duplicate pairs merged, plus six course terms (Prompt, Context Window,
Tool Calling, MCP, Prompt Injection, and Human in the Loop).
Open **AI 名词本 / AI Glossary** from the world map or any week's map to search
Chinese or English terms and definitions, filter by
category, and see the matched count. Previous/next buttons browse the filtered
cards; click a card or focus it and press Enter/Space to reveal its explanation
and example. Empty searches show a clear message and a reset button.

Quick quizzes randomly choose a term from the current results and offer three
distinct definitions. With fewer than three matches, distractors come from the
full glossary. You can return to the cards without answering. The glossary
supports keyboard navigation, Escape to close, and scrolling on small screens.

`GLOSSARY_SOURCE_URL` in `glossary.ts` records the term-list reference, linked as
**术语参考 / Term reference** in the glossary. This reference guides terminology;
the Chinese and English explanations and examples are original Draco educational
writing, not copied source definitions.

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
