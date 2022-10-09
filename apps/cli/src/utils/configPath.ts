import { join } from "path";
import { homedir } from "os";

export const configDir = join(homedir(), '.snippy');
export const configPath = join(homedir(), '.snippy', 'config.json');

