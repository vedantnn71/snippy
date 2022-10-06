import { SnippetState } from "./types";
import { devtools } from "zustand/middleware";
import create from "zustand";

export const useSnippetStore = create(
  devtools<SnippetState>((set) => ({
    activeSnippet: null,
    isReadOnly: false,
    setActiveSnippet: (id) => set({ activeSnippet: id }),
    setIsReadOnly: (isReadOnly) => set({ isReadOnly }),
  }))
);
