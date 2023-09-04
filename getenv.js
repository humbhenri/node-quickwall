import { env } from "node:process";

export default function get_env(name) {
  let val = env[name];
  if (val === undefined || val === null) {
    throw "missing env var for " + name;
  }
  return val;
}
