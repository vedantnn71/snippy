import { useRouter } from "next/router";
import { useEffect } from "react";
import { trpc } from "@/utils/trpc";
import { useSnippetStore } from "@/store";
import { Snippet } from "@/components";

export default function () {
  const router = useRouter();
  const { id } = router.query;
  const snippetQuery = trpc.snippet.byId.useQuery((id as string) || "");
  const setIsReadOnly = useSnippetStore((state) => state.setIsReadOnly);
  const setActiveSnippet = useSnippetStore((state) => state.setActiveSnippet);
  const activeSnippet = useSnippetStore((state) => state.activeSnippet);

  useEffect(() => {
    setActiveSnippet(id as string);
    setIsReadOnly(true);
  }, [id]);

  if (snippetQuery.isLoading) {
    return "loading...";
  }

  if (snippetQuery.data === null) {
    return "this does not exists, whopsis";
  }

  return <Snippet />;
}
