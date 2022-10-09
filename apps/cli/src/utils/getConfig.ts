import { Config } from "./types";
import { configPath } from "./configPath";
import { readFileSync } from "fs";

export const getConfig = (): Config => {
  return JSON.parse(readFileSync(configPath, "utf8"));
}

