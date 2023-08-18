#!/usr/bin/env node

import get_wallpaper_setter from "./wallsetter.js";
import get_wallpapers from "./unsplash.js";
import download_file from "./downloader.js";

// get wallpaper setter
const wall_setter = await get_wallpaper_setter();
console.log(`wallpaper setter is ${wall_setter}`);

// get wallpapers using unsplash api
const wallpaper = await get_wallpapers();
console.log(`wallpapers urls downloaded`);
const url = wallpaper.urls.full;
const filename = wallpaper.id;

// save to dir
const file = await download_file(url, filename, "~/.cache/node-quickwall");
console.log(`${file} saved`);

// set wallpaper
await wall_setter.set(file);
console.log(`wallpaper setted`);
