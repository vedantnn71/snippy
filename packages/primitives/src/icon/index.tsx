import { getIconPrefix } from "./getIconPrefix";
import { IIconProps } from "./types";

export const Icon = ({
  name,
  size = 24,
  color = "currentColor",
  className = "",
  type = "solid",
}: IIconProps) => (
  <i
    className={`bx ${getIconPrefix(type)}-${name} ${className}`}
    style={{ fontSize: size, color }}
  />
);
