import { Icon } from "@snippy/primitives";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import * as SelectPrimitive from "@radix-ui/react-select";
import cx from "classnames";

type ISelectIconProps = {
  value: string;
  setValue: (value: string) => void;
  showIconOnly?: boolean;
  onValueChange?: (value: string) => void;
};

export const SelectIcon = ({
  value,
  setValue,
  onValueChange,
  showIconOnly = false,
}: ISelectIconProps) => (
  <SelectPrimitive.Root
    defaultValue={value}
    onValueChange={(val) => {
      setValue(val);
      onValueChange?.(val);
    }}
  >
    <SelectPrimitive.Trigger asChild aria-label="Icons">
      <button className="outline-none flex items-center justify-center mt-1">
        {showIconOnly && <Icon type="logos" name={value} size={24} />}

        {!showIconOnly && (
          <>
            <SelectPrimitive.Value />
            <ChevronDownIcon />
          </>
        )}
      </button>
    </SelectPrimitive.Trigger>
    <SelectPrimitive.Content>
      <SelectPrimitive.ScrollUpButton className="flex items-center justify-center text-gray-300">
        <ChevronUpIcon />
      </SelectPrimitive.ScrollUpButton>
      <SelectPrimitive.Viewport className="bg-slate-11.5 p-2 rounded-lg shadow-lg">
        <SelectPrimitive.Group>
          {icons.map(({ name, icon }) => (
            <SelectPrimitive.Item
              key={name}
              value={name}
              className={cx(
                "relative flex items-center px-8 py-2 rounded-md text-sm text-gray-300 font-medium gap-2",
                "radix-disabled:opacity-50",
                "focus:outline-none select-none"
              )}
            >
              {icon}
              <SelectPrimitive.ItemText>{name}</SelectPrimitive.ItemText>
            </SelectPrimitive.Item>
          ))}
        </SelectPrimitive.Group>
      </SelectPrimitive.Viewport>
      <SelectPrimitive.ScrollDownButton className="flex items-center justify-center text-gray-700 dark:text-gray-300">
        <ChevronDownIcon />
      </SelectPrimitive.ScrollDownButton>
    </SelectPrimitive.Content>
  </SelectPrimitive.Root>
);

const icons = [
  {
    name: "javascript",
    icon: <Icon type="logos" name="javascript" size={24} color="#fff" />,
  },
  {
    name: "typescript",
    icon: <Icon type="logos" name="typescript" size={24} color="#fff" />,
  },
  {
    name: "react",
    icon: <Icon type="logos" name="react" size={24} color="#fff" />,
  },
  {
    name: "vuejs",
    icon: <Icon type="logos" name="vuejs" size={24} color="#fff" />,
  },
  {
    name: "angular",
    icon: <Icon type="logos" name="angular" size={24} color="#fff" />,
  },
  {
    name: "html5",
    icon: <Icon type="logos" name="html5" size={24} color="#fff" />,
  },
  {
    name: "css3",
    icon: <Icon type="logos" name="css3" size={24} color="#fff" />,
  },
  {
    name: "sass",
    icon: <Icon type="logos" name="sass" size={24} color="#fff" />,
  },
  {
    name: "tailwind-css",
    icon: <Icon type="logos" name="tailwind-css" size={24} color="#fff" />,
  },
  {
    name: "bootstrap",
    icon: <Icon type="logos" name="bootstrap" size={24} color="#fff" />,
  },
  {
    name: "nodejs",
    icon: <Icon type="logos" name="nodejs" size={24} color="#fff" />,
  },
  {
    name: "git",
    icon: <Icon type="logos" name="git" size={24} color="#fff" />,
  },
  {
    name: "github",
    icon: <Icon type="logos" name="github" size={24} color="#fff" />,
  },
  {
    name: "gitlab",
    icon: <Icon type="logos" name="gitlab" size={24} color="#fff" />,
  },
  {
    name: "docker",
    icon: <Icon type="logos" name="docker" size={24} color="#fff" />,
  },
  {
    name: "c-plus-plus",
    icon: <Icon type="logos" name="c-plus-plus" size={24} color="#fff" />,
  },
  {
    name: "python",
    icon: <Icon type="logos" name="python" size={24} color="#fff" />,
  },
  {
    name: "java",
    icon: <Icon type="logos" name="java" size={24} color="#fff" />,
  },
  {
    name: "go-lang",
    icon: <Icon type="logos" name="go-lang" size={24} color="#fff" />,
  },
  {
    name: "flutter",
    icon: <Icon type="logos" name="flutter" size={24} color="#fff" />,
  },
  {
    name: "mongodb",
    icon: <Icon type="logos" name="mongodb" size={24} color="#fff" />,
  },
  {
    name: "postgresql",
    icon: <Icon type="logos" name="postgresql" size={24} color="#fff" />,
  },
  {
    name: "firebase",
    icon: <Icon type="logos" name="firebase" size={24} color="#fff" />,
  },
  {
    name: "aws",
    icon: <Icon type="logos" name="aws" size={24} color="#fff" />,
  },
  {
    name: "heroku",
    icon: <Icon type="logos" name="heroku" size={24} color="#fff" />,
  },
  {
    name: "netlify",
    icon: <Icon type="logos" name="netlify" size={24} color="#fff" />,
  },
  {
    name: "wordpress",
    icon: <Icon type="logos" name="wordpress" size={24} color="#fff" />,
  },
];
