import { useListStore } from "@/store";
import { trpc } from "@/utils/trpc";
import { useEffect } from "react";
import { Icon, AlertDialog } from "@snippy/primitives";
import { ListsHeader } from "./header";
import cx from "classnames";
import { EditList } from "./updateList";

export const Lists = () => {
  const lists = trpc.list.all.useQuery();
  const utils = trpc.useContext();
  const activeList = useListStore((state) => state.activeList);
  const setActiveList = useListStore((state) => state.setActiveList);
  const mode = useListStore((state) => state.mode);

  const deleteMutation = trpc.list.delete.useMutation({
    onSuccess: () => {
      utils.list.all.invalidate();
    },
  });

  const listsToShow = lists.data?.filter((list) => {
    if (mode === "commands") {
      return list.isCommandList;
    }

    return !list.isCommandList;
  });

  const deleteList = async (id: string) => {
    await deleteMutation.mutateAsync(id);
    return;
  };

  useEffect(() => {
    if (listsToShow?.length) {
      setActiveList(listsToShow[0]?.id as string);
    }
  }, []);

  return (
    <div className="align-center border-r-slate-11.5 flex h-screen min-w-fit flex-col border-r-[1px]">
      <ListsHeader />

      <div className="hide-scrollbar overflow-y-scroll">
        {listsToShow?.map((list) => (
          <div
            key={list.id}
            className={cx(
              "group flex cursor-pointer items-center justify-between py-4 px-6",
              list.id === activeList ? "bg-slate-11.5" : ""
            )}
            onClick={() => setActiveList(list.id)}
          >
            <div className="flex items-center gap-2">
              <Icon type="logos" name={list.icon!} size={20} color="#fff" />
              <h1 className="text-md text-slate-6 font-medium">{list.name}</h1>
            </div>

            <div className="group-rdx-state-open:opacity-0 opacity-0 transition-all duration-500 group-hover:opacity-100 group-active:opacity-0 flex gap-2">
              <AlertDialog
                title={`Delete ${list.name}?`}
                description="Are you sure you want to delete this list?"
                confirmLabel="Delete"
                onConfirm={() => deleteList(list.id)}
                trigger={
                    <EditList id={list.id} />
                }
              />

              <Icon
                type="regular"
                name="trash"
                size={20}
                color="var(--red10)"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
