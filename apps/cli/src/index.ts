#!/usr/bin/env node
import { createConfigIfNotExists } from "@/utils";
import { readInput } from "@/cli";
import { getSnippet } from "./utils/getSnippet";
import "isomorphic-fetch";

const main = async () => {
  createConfigIfNotExists();
  const input = await readInput();

  console.log(input);

}

main();
