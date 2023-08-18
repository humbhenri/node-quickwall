import { promisify } from "util";
import { exec } from "child_process";
const exec_promise = promisify(exec);

class Nitrogen {
  async set(file_path) {
    const cmd = `nitrogen --set-zoom-fill ${file_path}`;
    try {
      const { stdout, stderr } = exec_promise(cmd);
      console.log(stdout);
      console.log(stderr);
    } catch (err) {
      console.log("Erro: " + err);
      throw new Error("Error at setting the desktop");
    }
  }

  toString() {
    return "Nitrogen";
  }
}

async function detect_setter() {
  try {
    await exec_promise("nitrogen --help");
    return new Nitrogen();
  } catch (err) {
    console.log(err);
    throw new Error("Error at detecting wallpaper setter");
  }
}

export default async function get_wallpaper_setter() {
  const setter = await detect_setter();
  if (!setter) {
    throw new Error("Wallpaper setter not found");
  }
  return setter;
}
