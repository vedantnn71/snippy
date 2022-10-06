import { useEffect, useState } from "react";
import { useSnippetStore } from "@/store";
import { trpc } from "@/utils/trpc";
import { SelectIcon } from "@/components";
import { Icon, AlertDialog } from "@snippy/primitives";

export const SnippetHeader = () => {
  const id = useSnippetStore((state) => state.activeSnippet);
  const setActiveSnippet = useSnippetStore((state) => state.setActiveSnippet);
  const isReadOnly = useSnippetStore((state) => state.isReadOnly);
  const snippetQuery = trpc.snippet.byId.useQuery(id!);
  const snippet = snippetQuery.data;
  const utils = trpc.useContext();
  const [icon, setIcon] = useState<string | null>(null);
  const [shareIcon, setShareIcon] = useState("share");

  const updateMutation = trpc.snippet.update.useMutation({
    onSuccess: () => {
      utils.snippet.byId.invalidate(id!);
      utils.snippet.all.invalidate();
    },
  });

  const deleteMutation = trpc.snippet.delete.useMutation({
    onSuccess: () => {
      utils.snippet.all.invalidate();
      setActiveSnippet(null);
    },
  });

  const deleteSnippet = () => {
    deleteMutation.mutateAsync(id!);
  };

  const updateIcon = (val: string) => {
    updateMutation.mutateAsync({
      id: id!,
      icon: val,
    });
  };

  const copySnippetLink = () => {
    const link = window.location.origin + "/snippet/" + id;
    navigator.clipboard.writeText(link);
  };

  useEffect(() => {
    if (snippetQuery.isLoading) {
      return;
    }

    setIcon(snippet?.icon!);
  }, [snippet?.icon]);

  return (
    <div className="border-slate-11.5 flex flex-col border-b py-4 px-6">
      <div className="flex flex-row items-center">
        {isReadOnly ? (
          <div className="flex flex-row items-center gap-2">
            <Icon type="logos" name={icon!} size={24} />
            <h1 className="text-slate-6 text-xl font-bold">{snippet?.name}</h1>
          </div>
        ) : (
          <>
            <SelectIcon
              value={icon!}
              setValue={setIcon}
              onValueChange={updateIcon}
              showIconOnly
            />

            <input
              className="bg-slate-12 ml-2 text-xl font-bold outline-none"
              defaultValue={snippet?.name}
              onBlur={(evt) => {
                updateMutation.mutate({
                  id: snippet?.id!,
                  name: evt.target.value,
                });
              }}
            />
          </>
        )}

        {!isReadOnly && (
          <div className="ml-auto flex items-center gap-4">
            <div
              className="hover:text-green-8 cursor-pointer"
              onClick={() => {
                copySnippetLink();
                setShareIcon("check");
                setTimeout(() => {
                  setShareIcon("share");
                }, 1500);
              }}
            >
              <Icon type="regular" name={shareIcon} size={20} />
            </div>
            <AlertDialog
              title={`Delete ${snippet?.name}?`}
              description="Are you sure you want to delete this snippet?"
              confirmLabel="Delete"
              onConfirm={deleteSnippet}
              trigger={
                <div className="hover:text-red-9 cursor-pointer">
                  <Icon type="regular" name={"trash"} size={20} />
                </div>
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};
