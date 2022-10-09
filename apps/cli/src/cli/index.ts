import { getVersion } from "@/utils";
import { getSnippet } from "@/utils/getSnippet";
import { Command } from "commander";
import { auth } from "./commands";

export const readInput = async () => {
  const program = new Command();

  program
    .description(
      "Rapidly organize your code snippets and commands.",
    )
    .version(getVersion())

  program
    .command('auth')
    .description('Authenticate with the API')
    .action(async () => {
      await auth();
    });

  program
    .command('copy')
    .description('Copy a snippet to your clipboard')
    .action(async (_, opt) => {
      const alias = opt.args[0];
      const snippet = await getSnippet({ alias });

      if (!snippet) {
        console.log("Snippet not found");
        return;
      }

      console.log({snippet});
    });

  program.parse(process.argv);

  const opts = program.opts();

  return {
    auth: opts.auth,
    run: opts.run,
    copy: opts.copy,
  };
}

