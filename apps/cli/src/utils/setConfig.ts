import { readFileSync, writeFileSync } from 'fs';
import { configPath } from './configPath';

export type ISetConfigParams = {
  apiKey: string;
}; 

export const setConfig = ({ apiKey }: ISetConfigParams): void => {
  const config = JSON.parse(readFileSync(configPath, 'utf8'));

  writeFileSync(configPath, JSON.stringify({ ...config, apiKey }));
}

