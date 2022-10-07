import { useSnippetStore } from "@/store";
import { trpc } from "@/utils/trpc";
import { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import type IStandaloneCodeEditor from "monaco-editor-core";
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
        <MonacoEditor snippetCode={snippetCode!} language={language} />
      </div>
    </div>
  );
};

interface IMonacoEditorProps {
  snippetCode: string;
  language: string;
}

const MonacoEditor = ({ snippetCode, language }: IMonacoEditorProps) => {
  const id = useSnippetStore((state) => state.activeSnippet);
  const utils = trpc.useContext();
  const isReadOnly = useSnippetStore((state) => state.isReadOnly);
  const editorRef = useRef<any | null>(null);
  const [monacoRefLoaded, setMonacoRefLoaded] = useState(false);

  const updateMutation = trpc.snippet.update.useMutation({
    onSuccess: () => {
      utils.snippet.byId.invalidate(id!);
    },
  });

  const handleEditorMount = (editor: typeof IStandaloneCodeEditor) => {
    editorRef.current = editor;
    setMonacoRefLoaded(true);
  };

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.onDidBlurEditorWidget(() => {
        updateMutation.mutateAsync({
          id: id as string,
          code: editorRef.current.getValue(),
        });
      });
    }
  }, [monacoRefLoaded, editorRef.current]);

  return (
    <Editor
      width="inherit"
      height="200px"
      defaultValue={snippetCode}
      onMount={handleEditorMount}
      language={language}
      options={{
        readOnly: isReadOnly,
        minimap: { enabled: false },
        theme: "vs-dark",
      }}
    />
  );
};
