// download urls to files
import path from "path";
import fs from "fs";
import { mkdir } from "fs/promises";
import { Readable } from "stream";
import { finished } from "stream/promises";
import untildify from "untildify";

export default async function download_file(url, filename, folder) {
  if (!url) {
    throw new Error("url is required");
  }
  if (!filename) {
    throw new Error("filename is required");
  }
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Error downloading file ${url}`);
  }
  const dest = untildify(folder);
  if (!fs.existsSync(dest)) {
    await mkdir(dest, { recursive: true });
  }
  console.log(`saving file ${filename} to ${dest}`);
  const file = path.join(dest, filename);
  const filestream = fs.createWriteStream(file, { flags: "wx" });
  await finished(Readable.fromWeb(res.body).pipe(filestream));
  return file;
}
