import { useSnippetStore } from "@/store";
import { trpc } from "@/utils/trpc";
import { Icon } from "@snippy/primitives";
import { useEffect, useState } from "react";
import { Code } from "./code";
import { SnippetHeader } from "./header";
import { z, ZodError } from "zod";
import cx from "classnames";

const aliasSchema = z.object({
  alias: z
    .string()
    .max(12, { message: "Alias is too long" })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message:
        "Alias can only contain letters, numbers, dashes and underscores",
    }),
});

export const Snippet = () => {
  const id = useSnippetStore((state) => state.activeSnippet) as string;
  const utils = trpc.useContext();
  const snippetQuery = trpc.snippet.byId.useQuery(id ?? "");
  const [alias, setAlias] = useState(snippetQuery.data?.alias!);
  const [aliasError, setAliasError] = useState<string | null>(null);

  const updateMutation = trpc.snippet.update.useMutation({
    onSuccess: () => {
      utils.snippet.byId.invalidate(id);
    },
  });

  const updateAlias = async () => {
    try {
      setAliasError(null);

      aliasSchema.parse({ alias });

      await updateMutation.mutateAsync({
        id,
        alias,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        setAliasError(error.errors[0]?.message!);
      }
    }
  };

  useEffect(() => {
    if (snippetQuery.data?.alias === null) {
      setAlias("");
      return;
    }

    setAlias(snippetQuery.data?.alias!);
  }, [snippetQuery.data?.alias]);

  if (id === null || !id) {
    return <div></div>;
  }

  return (
    <div className="w-full overflow-hidden">
      <SnippetHeader />
      <Code />

      <fieldset className="flex flex-col px-6 gap-0 focus-within:gap-3 transition-all duration-300">
        <label className="font-medium text-slate-8">Alias</label>
        <div className="flex group bg-transparent focus-within:bg-slate-11.5 rounded-xl">
          <input
            className="w-full border-none outline-none bg-slate-12 focus:bg-slate-11.5 p-0 focus:p-4 rounded-xl transition-all duration-300"
            onChange={(e) => setAlias(e.target.value)}
            placeholder="alias is like a short name for your snippet"
            pattern="^(?!\\d+$)\\w{8,20}$"
            maxLength={12}
            value={alias}
            required
          />
          <button
            className={cx(
              "p-3 px-6 rounded-xl opacity-0 border-none outline-none",
              "group-focus-within:opacity-100 hover:text-slate-6 transition-all duration-300"
            )}
            type="submit"
            onClick={updateAlias}
          >
            <Icon type="regular" name="check" />
          </button>
        </div>
        <div className="text-red-8 text-sm">{aliasError!}</div>
      </fieldset>
    </div>
  );
};
