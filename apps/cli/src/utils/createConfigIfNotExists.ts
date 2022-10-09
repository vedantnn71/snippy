import { configPath, configDir } from './configPath';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

export const createConfigIfNotExists = async () => {
  if (!existsSync(configDir)) {
    mkdirSync(configDir);
    
    if (!existsSync(configPath)) {
      writeFileSync(configPath, JSON.stringify({ apiKey: '' }));
    }
  }
}

