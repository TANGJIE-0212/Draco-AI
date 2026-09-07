import { mkdir, readFile, writeFile } from "node:fs/promises";

const output = new URL("../dist/", import.meta.url);
const html = await readFile(new URL("index.html", output), "utf8");
if (!html.includes("/draco-ai/assets/")) {
  throw new Error("Build with --base=/draco-ai/ before preparing Pages routes");
}
for (const language of ["cn", "en", "zh"]) {
  const directory = new URL(`${language}/`, output);
  await mkdir(directory, { recursive: true });
  const localizedHtml = language === "en"
    ? html.replace('lang="zh-CN"', 'lang="en"').replace("<title>AI驯龙之路</title>", "<title>Draco AI Learning Quest</title>")
    : html;
  await writeFile(new URL("index.html", directory), localizedHtml);
}
