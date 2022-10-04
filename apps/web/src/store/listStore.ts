import create from "zustand";
import { ListState } from "./types";

export const useListStore = create<ListState>((set) => ({
  mode: "snippets",
  setMode: (mode: ListState["mode"]) => set({ mode }),
  activeList: null,
  setActiveList: (id: string) => set({ activeList: id }),
}));
