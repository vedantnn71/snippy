import { Icon } from "@snippy/primitives";
import { useSnippetStore } from "@/store";
import { trpc } from "@/utils/trpc";
import { useEffect, useState } from "react";
import { SelectIcon } from "@/components";

export const SnippetHeader = () => {
  const id = useSnippetStore((state) => state.activeSnippet);
  const isReadOnly = useSnippetStore((state) => state.isReadOnly);
  const snippetQuery = trpc.snippet.byId.useQuery(id!);
  const deleteMutation = trpc.snippet.delete.useMutation();
  const snippet = snippetQuery.data;
  const utils = trpc.useContext();
  const [icon, setIcon] = useState<string | null>(null);

  const updateMutation = trpc.snippet.update.useMutation({
    onSuccess: () => {
      utils.snippet.byId.invalidate(id!);
      utils.snippet.all.invalidate();
    },
  });

  const updateIcon = (val: string) => {
    updateMutation.mutateAsync({
      id: id!,
      icon: val,
    });
  };

  useEffect(() => {
    if (snippetQuery.isLoading) {
      return;
    }

    setIcon(snippet?.icon!);
  }, [snippet?.icon]);

  return (
    <div className="flex flex-col border-b border-slate-11.5 py-4 px-6">
      <div className="flex flex-row items-center">
        {isReadOnly ? (
          <div className="flex flex-row items-center gap-2">
            <Icon type="logos" name={icon!} size={24} />
            <h1 className="text-xl font-bold text-slate-6">{snippet?.name}</h1>
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
              className="text-xl font-bold ml-2 bg-slate-12 outline-none"
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
          <div className="flex items-center ml-auto gap-4">
            <Icon type="regular" name={"share"} size={20} />
            <div className="hover:text-red-9">
              <Icon type="regular" name={"trash"} size={20} />
            </div>
          </div>
      )}
      </div>
    </div>
  );
};