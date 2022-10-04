import { useListStore } from "@/store";
import { trpc } from "@/utils/trpc";
import { Icon } from "@snippy/primitives";
import { ListsHeader } from "./header";

export const Lists = () => {
  const lists = trpc.list.all.useQuery();
  const setActiveList = useListStore((state) => state.setActiveList);

  return (
    <div className="align-center border-r-slate-11.5 flex h-screen flex-col border-r-[1px]">
      <ListsHeader />

      <div className="overflow-y-scroll hide-scrollbar">
        {lists.data?.map((list) => (
          <div
            key={list.id}
            className="flex items-center justify-between p-6 cursor-pointer active:scale-95 transition-all duration-300"
            onClick={() => setActiveList(list.id)}
          >
            <div className="flex items-center gap-2">
              <Icon type="logos" name={list.icon!} size={20} color="#fff" />
              <h1 className="text-md font-medium text-slate-6">{list.name}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
