import { expect, test } from "@jest/globals";
import get_wallpapers from "./unsplash";
const getenv = import("./getenv");

test("test it", async () => {
  getenv.get_env = () => {}
  const data = await get_wallpapers();
  expect(data).toBeNull();
});
