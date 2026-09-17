# V3 bilingual web / latest WeChat alignment

## Scope

Port the approved WeChat homepage and learning cards into both Chinese and English V3 web experiences. Both web languages now share WorldMap, StudyCards, MapMusic and the same WAV feedback. Curriculum, progress storage and the original blue daily maps are unchanged.

The web implementation is isolated in `web-sync/`; it does not import the native runtime or require the untracked WeChat project in production.

## Matched details

- Same green S-shaped route, terrain, four drifting clouds and eight twinkling stars (positions, sizes, opacity, duration and delays).
- Same SVG home/week/lock, close, pager and example icons; same title font.
- Same raised button treatment, press shadows, marker badges, glossary entry and music toggle sizes.
- Fixed 70vw cards (maximum container width 576px); height 440px / maximum 52vh / minimum 360px. Padding 32px 28px, 420ms flip, internal definition scrolling.
- Front “翻翻看”, back “下一个”, separate arrows/count and “测一测”. Quiz feedback and “再来一题” use native spacing, colors and weight.
- Same 103 curated concepts, stable mixed-category order beginning with Token, and studied-concept quiz selection.
- Same six WAV assets and native volumes; default-on map loop, remembered off preference, map entry cue, interaction/correct/wrong/completion effects. Music is stopped outside maps and when the document is hidden.

## Intentional platform adaptations

| Area | Web | WeChat |
| --- | --- | --- |
| Top | Compact 16px top inset, no capsule spacer | Avoid status bar / WeChat capsule |
| Bottom | Device safe area only | Native device safe area |
| Route layout | Calculate from available browser height | Calculate after native header inset |
| Glossary | Translucent modal over map | Opaque standalone page (approved) |
| Video | HTML video controls / browser fullscreen | Native WeChat controls |
| Audio | Browser gesture/autoplay restrictions, no native haptics | WeChat audio/mute rules and vibration |
| Navigation | Close, keyboard Tab/Escape, pointer focus | Touch and native page back |

## Verification — 2026-09-17

- `node scripts/test-v3-web-sync.mjs --require-native`: passed in the handoff workspace. A web-only checkout can omit `--require-native`; native asset comparisons are explicitly skipped there.
- Targeted TypeScript check of `web-sync/ChineseExperience.tsx`: passed.
- `npm run build:pages`: passed; existing large-bundle warning remains.
- Native validate, event-handler, map-audio, markdown and V3 presentation suites: passed. These are not a claim of a new native simulator end-to-end run.
- Browser checks at 390×844, 320×568 and 1280×900: no horizontal overflow. Four home nodes fit the tall-phone/desktop viewport; short-screen content scrolls.
- Card front/back/next measured 273×438.875px at 390×844, with unchanged top position 168.0625px. Desktop card 576×440px; narrow card 224×360px.
- Flip locks, next-front reset, studied-only quiz, wrong/correct feedback, answer locking, return to learning, keyboard close and first-week/first-day entry: passed.
- Production-path preview: `npm run preview -- --host 127.0.0.1 --port 4173 --base=/draco-ai/`. Both CN and EN load; EN retains its original glossary. No errors in the production preview logs at initial page checks.

## Release safety

Source target: `TANGJIE-0212/Draco-AI`, branch `course-v3`.
Site target: `TANGJIE-0212/TANGJIE-0212.github.io`, with `CNAME` = `daytoy.online`.

Stage only V3 changes, not unrelated README/package edits or the untracked WeChat project. On the site, replace root, cn, zh and en HTML entrypoints and add the new hashed bundles. Retain all existing assets for rollback and avoid changing other site projects. Verify the actual deployment result before reporting the version live.

## Bilingual follow-up — 2026-09-17

- Supersedes the initial-release notes above that English retained its old UI. Both languages now use the same compact homepage, curved route, fixed-size flip cards, stable 103-term order and studied-card quiz.
- English labels, categories, definitions, examples, feedback and accessibility captions are localized; the secondary term remains bilingual. The compact English title is “Draco AI”, using the existing Fredoka font; Chinese keeps JingNanBubble.
- Ordinary lesson Continue no longer plays a pop cue. Native Continue was already silent; runtime regression assertions now enforce no sound or vibration on non-completion navigation. Correct/wrong and lesson completion cues remain; web lesson completion now uses the same complete WAV as native.
- Both-language server-render checks, actual Continue handler execution (advance/review/complete), targeted TypeScript, Pages build, native 28-day event runtime and native map-audio/presentation/markdown/integrity suites passed.
- Safari production-preview inspection: English green homepage and card front/back render with shared styling and English definitions. Initial-release mobile geometry checks remain applicable to the unchanged shared layout; no new WeChat simulator E2E or native upload is claimed.
