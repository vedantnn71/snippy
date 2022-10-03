import { ReactNode } from "react";

export interface IButtonProps {
  size: "sm" | "md" | "lg";
  color: "primary" | "secondary";
  disabled: boolean;
  loading: boolean;
  children: ReactNode;
  onClick: () => void;
}

export type ButtonSize = "sm" | "md" | "lg";
export type ButtonColor = "primary" | "secondary";