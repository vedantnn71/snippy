import { useSnippetStore, useListStore } from "@/store";
import { trpc } from "@/utils/trpc";
import { useEffect } from "react";
import { AddSnippet } from "./addSnippet";
import { Icon, AlertDialog } from "@snippy/primitives";
import cx from "classnames";

export const Snippets = () => {
  const activeList = useListStore((state) => state.activeList);
  const activeSnippet = useSnippetStore((state) => state.activeSnippet);
  const setActiveSnippet = useSnippetStore((state) => state.setActiveSnippet);
  const snippetsQuery = trpc.snippet.all.useQuery(activeList!);
  const snippets = snippetsQuery.data ?? [];
  const utils = trpc.useContext();
  const deleteMutation = trpc.snippet.delete.useMutation({
    onSuccess: () => {
      utils.snippet.all.invalidate();
    },
  });

  const deleteSnippet = async (id: string) => {
    await deleteMutation.mutateAsync(id);
    return;
  };

  useEffect(() => {
    utils.snippet.all.invalidate();
  }, [activeSnippet]);

  if (activeList === null || snippetsQuery.isLoading) {
    return <div></div>;
  }

  return (
    <div className="align-center border-r-slate-11.5 flex h-screen min-w-fit flex-col border-r-[1px]">
      <div className="hide-scrollbar flex flex-col gap-1 overflow-y-scroll">
        {snippets.sort().map((snippet) => (
          <div
            key={snippet.id}
            className={cx(
              "group flex cursor-pointer items-center justify-between py-4 px-6",
              activeSnippet === snippet.id ? "bg-slate-11.5" : ""
            )}
            onClick={() => setActiveSnippet(snippet.id)}
          >
            <div className="flex items-center gap-2">
              <Icon type="logos" name={snippet.icon!} size={20} color="#fff" />
              <h1 className="text-md text-slate-6 font-medium">
                {snippet.name}
              </h1>
            </div>

            <AlertDialog
              title={`Delete ${snippet.name}?`}
              description="Are you sure you want to delete this snippet?"
              confirmLabel="Delete"
              onConfirm={() => deleteSnippet(snippet.id)}
              trigger={
                <span className="group-rdx-state-open:opacity-0 opacity-0 transition-all duration-500 group-hover:opacity-100 group-active:opacity-0">
                  <Icon
                    type="regular"
                    name="trash"
                    size={20}
                    color="var(--red10)"
                  />
                </span>
              }
            />
          </div>
        ))}

        <AddSnippet />
      </div>
    </div>
  );
};
