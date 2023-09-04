import get_env from "./getenv.js"
import { promisify } from "util";
import { exec } from "child_process";
const exec_promise = promisify(exec);

async function runCmd(cmd) {
  console.log(`running ${cmd}`);
    try {
      const { stdout, stderr } = await exec_promise(cmd);
      console.log(stdout);
      console.log(stderr);
    } catch (err) {
      console.log("Erro: " + err);
      throw new Error("Error at setting the desktop");
    }
}

class Nitrogen {
  async set(file_path) {
    const cmd = `nitrogen --set-zoom-fill ${file_path}`;
    await runCmd(cmd)
  }

  toString() {
    return "Nitrogen";
  }
}

class Gnome {
  async set(file_path) {
    const cmd = `gsettings set org.gnome.desktop.background picture-uri-dark file://${file_path}`
    await runCmd(cmd)
  }

  toString() {
    return "Gnome";
  }
}

async function detect_setter() {
  try {
    if (get_env("XDG_CURRENT_DESKTOP") === "GNOME") {
      return new Gnome();
    }
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
