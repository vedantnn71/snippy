import { Icon } from "@snippy/primitives";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { ISelectIconProps } from "./types";
import { icons } from "./icons";
import * as SelectPrimitive from "@radix-ui/react-select";
import cx from "classnames";

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
      <button className="mt-1 flex items-center justify-center outline-none">
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
      <SelectPrimitive.Viewport className="bg-slate-11.5 rounded-lg p-2 shadow-lg">
        <SelectPrimitive.Group>
          {icons.map(({ name, icon }) => (
            <SelectPrimitive.Item
              key={name}
              value={name}
              className={cx(
                "relative flex items-center gap-2 rounded-md px-8 py-2 text-sm font-medium text-gray-300",
                "radix-disabled:opacity-50",
                "select-none focus:outline-none"
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