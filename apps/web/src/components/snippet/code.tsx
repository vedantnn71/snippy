import { useSnippetStore } from "@/store";
import { trpc } from "@/utils/trpc";
import { Editor } from "./editor";
import SelectLanguage from "./selectLanguage";

export const Code = () => {
  const id = useSnippetStore((state) => state.activeSnippet);
  const snippetQuery = trpc.snippet.byId.useQuery(id!);
  const utils = trpc.useContext();
  const language = snippetQuery.data?.language || "plaintext";
  const snippetCode = snippetQuery.data?.code;
  const isReadOnly = useSnippetStore((state) => state.isReadOnly);

  const updateMutation = trpc.snippet.update.useMutation({
    onSuccess: () => {
      utils.snippet.byId.invalidate(id!);
    },
  });

  const updateLanguage = async (language: string) => {
    updateMutation.mutate({ id: id!, language });
  };

  if (snippetQuery.isLoading) {
    return <div className="m-4">Loading...</div>;
  }

  return (
    <div className="my-4 flex flex-col items-start justify-start gap-4 px-6">
      {isReadOnly ? (
        <h1 className="text-md text-slate-8 font-semibold">
          {snippetQuery.data?.language}
        </h1>
      ) : (
        <SelectLanguage value={language} setValue={updateLanguage} />
      )}

      <div className="z-[1] w-full overflow-hidden rounded-xl">
        <Editor snippetCode={snippetCode!} language={language} />
      </div>
    </div>
  );
};
