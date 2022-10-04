import { ISidebarButtonProps } from "./types";

export const SidebarButton = ({ children }: ISidebarButtonProps) => (
  <button className="outline-none transition-all duration-300 active:scale-95">
    {children}
  </button>
);
