import inquirer from "inquirer";
import { getConfig, setConfig } from "@/utils";

export const auth = async () => {
  const { apiKey } = getConfig();
  const hiddenApiKey = apiKey.replace(/./g, "*");
  const { token } = await inquirer.prompt([
    {
      type: "input",
      name: "token",
      message: "Enter your API key",
      default: hiddenApiKey,
    },
  ]);

  setConfig({ apiKey: token });
}
