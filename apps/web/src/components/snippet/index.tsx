import { useSnippetStore } from "@/store";
import { Code } from "./code";
import { SnippetHeader } from "./header";

export const Snippet = () => {
  const id = useSnippetStore((state) => state.activeSnippet);

  if (id === null || !id) {
    return <div></div>;
  }

  return (
    <div className="w-full overflow-hidden">
      <SnippetHeader />
      <Code />
    </div>
  );
};
