import { Icon } from "@snippy/primitives";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import * as SelectPrimitive from "@radix-ui/react-select";
import cx from "classnames";

type ISelectLanguageProps = {
  value: string;
  setValue: (value: string) => void;
};

const SelectLanguage = ({ value, setValue }: ISelectLanguageProps) => (
  <SelectPrimitive.Root defaultValue={value} onValueChange={setValue}>
    <SelectPrimitive.Trigger asChild aria-label="Icons">
      <button className="outline-none flex items-center justify-center mt-1">
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
      <SelectPrimitive.Viewport className="bg-slate-11.5 p-2 rounded-lg shadow-lg z-[99]">
        <SelectPrimitive.Group>
          {languages.map(
            (language) => (
              <SelectPrimitive.Item
                key={language}
                value={language}
                className={cx(
                  "relative flex items-center px-8 py-2 rounded-md text-sm text-gray-300 font-medium gap-2",
                  "radix-disabled:opacity-50",
                  "focus:outline-none select-none"
                )}
              >
                <SelectPrimitive.ItemText>
                  {language}
                </SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            )
          )}
        </SelectPrimitive.Group>
      </SelectPrimitive.Viewport>
      <SelectPrimitive.ScrollDownButton className="flex items-center justify-center text-gray-700 dark:text-gray-300">
        <ChevronDownIcon />
      </SelectPrimitive.ScrollDownButton>
    </SelectPrimitive.Content>
  </SelectPrimitive.Root>
);

export default SelectLanguage;

const languages = [
  "plaintext",
  "javascript",
  "typescript",
  "python",
  "java",
  "c",
  "c++",
  "c#",
  "go",
  "php",
  "ruby",
  "rust",
  "swift",
  "kotlin",
  "scala",
  "dart",
  "bash",
  "html",
  "css",
  "json",
  "yaml",
  "markdown",
  "sql",
  "graphql",
  "docker",
  "nginx",
  "apache",
  "vim",
  "emacs",
  "git",
  "powershell",
  "shell",
  "makefile",
  "diff",   
  "ini",
  "toml",
  "xml",
  "latex",
  "clojure",
  "elixir",
  "erlang",
  "haskell",
  "lua",
  "perl",
  "r",
  "scheme",
  "viml",
  "assembly",
  "fortran",
  "pascal",
  "prolog",
  "racket",
  "verilog",
  "zig",
  "abap",
  "apex",
  "azcli",
  "bat",
  "bicep",
  "coffeescript",
  "fsharp",
]
