// unsplash wallpaper api
import queryString from "query-string";
import get_env from "./getenv.js";

const API_KEY_NAME = "UNSPLASH_API_KEY";
const API_KEY = get_env(API_KEY_NAME);
const URL = `https://api.unsplash.com/photos/random/`;

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
