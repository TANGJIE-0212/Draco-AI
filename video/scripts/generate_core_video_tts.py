import asyncio
import json
from pathlib import Path

import edge_tts
from mutagen.mp3 import MP3

ROOT = Path(__file__).resolve().parents[2]
CONTENT_PATH = ROOT / "video" / "core-video-content.json"
MANIFEST_PATH = ROOT / "video" / "generated" / "core-video-manifest.json"
PUBLIC_PATH = ROOT / "public" / "video" / "core"
VOICE_BY_LANGUAGE = {
    "zh-CN": "zh-CN-XiaoxiaoNeural",
    "en-US": "en-US-JennyNeural",
}
RATE_BY_LANGUAGE = {"zh-CN": "+5%", "en-US": "+2%"}


def read_cues(path: Path):
    cues = []
    for line in path.read_text(encoding="utf-8-sig").splitlines():
        if not line.strip():
            continue
        item = json.loads(line)
        start = item["offset"] / 10_000_000
        duration = item["duration"] / 10_000_000
        cues.append({
            "start": round(start, 3),
            "end": round(start + duration, 3),
            "text": item["text"].strip(),
        })
    return cues


async def generate_video(video):
    video_id = video["id"]
    language = video["language"]
    destination = PUBLIC_PATH / video_id
    destination.mkdir(parents=True, exist_ok=True)
    timings = []

    for index, scene in enumerate(video["scenes"], start=1):
        audio_name = f"scene-{index:02}-{scene['id']}.mp3"
        metadata_name = f"scene-{index:02}-{scene['id']}.jsonl"
        audio_path = destination / audio_name
        metadata_path = destination / metadata_name
        communicator = edge_tts.Communicate(
            scene["narration"],
            VOICE_BY_LANGUAGE[language],
            rate=RATE_BY_LANGUAGE[language],
        )
        await communicator.save(str(audio_path), str(metadata_path))
        duration = round(MP3(audio_path).info.length, 3)
        timings.append({
            "id": scene["id"],
            "audio": f"video/core/{video_id}/{audio_name}",
            "durationSeconds": duration,
            "cues": read_cues(metadata_path),
        })
        print(f"[{video_id}] {scene['id']}: {duration:.1f}s")

    return video_id, timings


async def main():
    content = json.loads(CONTENT_PATH.read_text(encoding="utf-8"))
    manifest = {}
    for video in content["videos"]:
        video_id, timings = await generate_video(video)
        manifest[video_id] = timings

    MANIFEST_PATH.parent.mkdir(parents=True, exist_ok=True)
    MANIFEST_PATH.write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"Wrote {MANIFEST_PATH}")


if __name__ == "__main__":
    asyncio.run(main())
