export interface ListState {
  mode: Mode;
  activeList: string | null;
  setMode: (mode: Mode) => void;
  setActiveList: (id: string) => void;
}

export type Mode = "code" | "command";
