import { SnippetState } from "./types";
import create from "zustand";

export const useSnippetStore = create<SnippetState>((set) => ({
  activeSnippet: null,
  setActiveSnippet: (id) => set({ activeSnippet: id }),
}));
