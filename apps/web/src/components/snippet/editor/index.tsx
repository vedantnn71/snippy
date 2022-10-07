import { useEffect, useRef, useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import type IStandaloneCodeEditor from "monaco-editor-core";
import { IEditorProps } from "./types";
import { useSnippetStore } from "@/store";
import { trpc } from "@/utils/trpc";

export const Editor = ({ snippetCode, language }: IEditorProps) => {
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
    <MonacoEditor
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
