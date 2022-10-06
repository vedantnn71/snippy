import create from "zustand";
import { devtools } from "zustand/middleware";
import { ListState } from "./types";

export const useListStore = create(
  devtools<ListState>(
    ((set) => ({
    mode: "snippets",
    setMode: (mode: ListState["mode"]) => set({ mode }),
    activeList: null,
    setActiveList: (id: string) => set({ activeList: id }),
  }))
));
