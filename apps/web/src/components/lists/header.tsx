import { AddList } from "./addList";
import { useListStore } from "@/store";

export const ListsHeader = () => {
  const mode = useListStore((state) => state.mode);
  const setMode = useListStore((state) => state.setMode);

  const toggleMode = () => {
    setMode(mode === "code" ? "command" : "code");
  }

  return (
    <div className="flex justify-between align-center py-4 px-6 text-slate-2 border-b border-b-slate-11.5">
      <h1 className="text-xl font-semibold cursor-pointer hover:opacity-80" onClick={toggleMode}>
        {mode[0]?.toUpperCase() + mode.slice(1)}
      </h1>

      <AddList />
    </div>
  );
}