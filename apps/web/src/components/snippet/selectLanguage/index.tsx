import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { ISelectLanguageProps } from "./types";
import { languages } from "./languages";
import * as SelectPrimitive from "@radix-ui/react-select";
import cx from "classnames";

const SelectLanguage = ({ value, setValue }: ISelectLanguageProps) => (
  <SelectPrimitive.Root defaultValue={value} onValueChange={setValue}>
    <SelectPrimitive.Trigger asChild aria-label="Icons">
      <button className="mt-1 flex items-center justify-center outline-none">
        <SelectPrimitive.Value />
        <SelectPrimitive.Icon className="ml-2">
          <ChevronDownIcon />
        </SelectPrimitive.Icon>
      </button>
    </SelectPrimitive.Trigger>
    <SelectPrimitive.Content>
      <SelectPrimitive.ScrollUpButton className="flex items-center justify-center text-gray-300">
        <ChevronUpIcon />
      </SelectPrimitive.ScrollUpButton>
      <SelectPrimitive.Viewport className="bg-slate-11.5 z-[99] rounded-lg p-2 shadow-lg">
        <SelectPrimitive.Group>
          {languages.map((language) => (
            <SelectPrimitive.Item
              key={language}
              value={language}
              className={cx(
                "relative flex items-center gap-2 rounded-md px-8 py-2 text-sm font-medium text-gray-300",
                "radix-disabled:opacity-50",
                "select-none focus:outline-none"
              )}
            >
              <SelectPrimitive.ItemText>{language}</SelectPrimitive.ItemText>
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

export default SelectLanguage;
