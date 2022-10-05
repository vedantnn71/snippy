import { AddList } from "./addList";
import { useListStore } from "@/store";

export const ListsHeader = () => {
  const mode = useListStore((state) => state.mode);
  const setMode = useListStore((state) => state.setMode);

  const toggleMode = () => {
    setMode(mode === "snippets" ? "commands" : "snippets");
  }

  return (
    <div className="flex justify-between align-center py-4 px-6 text-slate-2 border-b border-b-slate-11.5">
      <h1 className="text-xl font-semibold cursor-pointer hover:opacity-80" onClick={toggleMode}>
        {mode === "snippets" ? "Snippets" : "Commands"}
      </h1>

      <AddList />
    </div>
  );
}
