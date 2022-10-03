import { IButtonProps, ButtonSize, ButtonColor } from "./types";
import { Loading } from "@snippy/primitives";
import { useState } from "react";
import cx from "classnames";

export const Button = ({
  size = "md",
  color = "primary",
  disabled = false,
  loading = false,
  onClick,
  children,
}: IButtonProps) => {
  const sizeClasses = getSize(size);
  const colorClasses = getColor(color);

  return (
    <button
      className={cx(
        "flex items-center justify-center gap-2 rounded-xl px-4 py-3",
        "border-[1px] border-[#4C5155] outline-none transition-all duration-200 ease-in-out",
        sizeClasses,
        colorClasses,
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        !disabled && "hover:scale-[98%] active:scale-95"
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <Loading size={24} />
          <span className="text-slate-8">Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

const getSize = (size: ButtonSize): string => {
  let sizeClass = "";

  switch (size) {
    case "sm":
      sizeClass = "text-sm";
      break;

    case "md":
      sizeClass = "text-base";
      break;

    case "lg":
      sizeClass = "text-lg";
      break;
  }

  return sizeClass;
};

const getColor = (color: ButtonColor): string => {
  let colorClass = "";

  switch (color) {
    case "primary":
      colorClass = "bg-pink-10 text-white";
      break;

    case "secondary":
      colorClass = "bg-gray-12 text-white";
      break;
  }

  return colorClass;
};
