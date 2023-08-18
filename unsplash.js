// unsplash wallpaper api
import { env } from "node:process";
import queryString from "query-string";

const API_KEY_NAME = "UNSPLASH_API_KEY";
const API_KEY = get_env(API_KEY_NAME);
const URL = `https://api.unsplash.com/photos/random/`;

function get_env(name) {
  let val = env[name];
  if (val === undefined || val === null) {
    throw "missing env var for " + name;
  }
  return val;
}

export default async function get_wallpapers() {
  const params = {
    client_id: API_KEY,
    per_page: 30,
  };
  const res = await fetch(`${URL}?${queryString.stringify(params)}`);
  if (!res.ok) {
    throw new Error("Response not ok");
  }
  const data = await res.json();
  const { id, slug, urls } = data;
  return { id, slug, urls };
}
