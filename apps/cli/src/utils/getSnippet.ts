//import { prisma } from "@snippy/db";

import { client } from "./trpc";

export type IGetSnippetParams = {
  alias: string;
}


export const getSnippet = async ({ alias }: IGetSnippetParams) => {
  const snippet =await client.snippet.byId.query(alias);
  console.log({snippet})
  return snippet;
}
