import { AddList } from "./addList";
import { useListStore } from "@/store";

export const ListsHeader = () => {
  const mode = useListStore((state) => state.mode);
  const setMode = useListStore((state) => state.setMode);

  const toggleMode = () => {
    setMode(mode === "snippets" ? "commands" : "snippets");
  };

  return (
    <div className="align-center text-slate-2 border-b-slate-11.5 flex justify-between border-b py-4 px-6">
      <h1
        className="cursor-pointer text-xl font-semibold hover:opacity-80"
        onClick={toggleMode}
      >
        {mode === "snippets" ? "Snippets" : "Commands"}
      </h1>

      <AddList />
    </div>
  );
};
