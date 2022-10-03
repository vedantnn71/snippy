interface IIconProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
  type?: "solid" | "regular" | "logos";
}

type IconPrefix = "bx" | "bxs" | "bxl";

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


const getIconPrefix = (type: "solid" | "regular" | "logos"): IconPrefix => {
  let prefix: IconPrefix = "bx";

  switch (type) {
    case "solid":
      prefix = "bxs";
      break;

    case "regular":
      prefix = "bx";
      break;

    case "logos":
      prefix = "bxl";
      break;
  }

  return prefix;
}
