export const getIconPrefix = (type: "solid" | "regular" | "logos"): IconPrefix => {
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
};

export type IconPrefix = "bx" | "bxs" | "bxl";
