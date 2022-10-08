import { Transition } from "@headlessui/react";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Fragment, useState } from "react";
import { Icon } from "@snippy/primitives";
import { useListStore } from "@/store";
import { trpc } from "@/utils/trpc";
import { SelectIcon } from "@/components";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import cx from "classnames";

export type IEditListProps = {
  id: string;
}

export const EditList = ({ id }: IEditListProps) => {
  const mode = useListStore((state) => state.mode);
  const utils = trpc.useContext();
  const listQuery = trpc.list.byId.useQuery(id);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(listQuery.data?.name);
  const [alias, setAlias] = useState(listQuery.data?.alias);
  const [icon, setIcon] = useState(listQuery.data?.icon);
  const [error, setError] = useState<string | null>();

  const updateListMutation = trpc.list.update.useMutation({
    onSuccess: () => {
      utils.list.all.invalidate();
    },
  });

  const updateList = async () => {
    if (name === "") {
      setError("Name can't be blank");
      return;
    }

    if (alias === "") {
      setError("Alias can't be blank");
      return;
    }

    if (icon === "") {
      setError("Icon can't be blank");
      return;
    }

    await updateListMutation.mutateAsync({
      id,
      name: name!,
      icon: icon!, 
      alias: alias!,
    });

    setIsOpen(false);
  };

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <DialogPrimitive.Trigger asChild>
        <button className="ml-4 grid items-center outline-none hover:opacity-80">
          <Icon
            type="regular"
            name="pencil"
            size={20}
            color="rgba(255,255,255,0.8)"
          />
        </button>
      </DialogPrimitive.Trigger>
      <Transition.Root show={isOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <DialogPrimitive.Overlay
            forceMount
            className="fixed inset-0 z-20 bg-[#1b1b1b75] backdrop-blur-sm"
          />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <DialogPrimitive.Content
            forceMount
            className={cx(
              "fixed z-50",
              "w-[95vw] max-w-lg rounded-lg p-8 md:w-full",
              "top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]",
              "bg-slate-11.5",
              "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
            )}
          >
            <h1 className="text-sm font-medium text-gray-100">Edit List</h1>

            <DialogPrimitive.Description className="text-slate-4 mt-2 text-sm font-normal">
              Edit your {listQuery.data?.name!} list
            </DialogPrimitive.Description>

            <div className="mt-4 space-y-2 flex flex-col gap-2">
              <fieldset>
                <label
                  htmlFor="listName"
                  className="text-sm font-medium text-gray-400"
                >
                  Name
                </label>
                <input
                  id="listName"
                  type="text"
                  placeholder={
                    mode === "snippets"
                      ? "typescript snippets"
                      : "tmux commands"
                  }
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={cx(
                    "bg-slate-11.5 mt-1 block w-full rounded-md",
                    "text-gray-4 text-sm placeholder:text-gray-600",
                    "border border-gray-700 focus-visible:border-transparent",
                    "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                  )}
                  maxLength={16}
                  required
                />
              </fieldset>

              <fieldset>
                <label
                  htmlFor="listName"
                  className="text-sm font-medium text-gray-400"
                >
                  Alias
                </label>
                <input
                  id="listName"
                  type="text"
                  placeholder="alias are short names for your lists"
                  value={alias}
                  onChange={(e) => setAlias(e.target.value)}
                  className={cx(
                    "bg-slate-11.5 mt-1 block w-full rounded-md",
                    "text-gray-4 text-sm placeholder:text-gray-600",
                    "border border-gray-700 focus-visible:border-transparent",
                    "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                  )}
                  maxLength={16}
                  required
                />
              </fieldset>

              <fieldset>
                <label
                  htmlFor="icon"
                  className="text-sm font-medium text-gray-400"
                >
                  Icon
                </label>
                <SelectIcon value={icon} setValue={setIcon} />
              </fieldset>

              {error && (
                <div className="text-red-9 flex flex-col gap-1 text-sm font-normal">
                  <h3 className="font-semibold">Error</h3>
                  <span>{error}</span>
                </div>
              )}

              <div className="mt-4 flex justify-end">
                <button
                  className={cx(
                    "inline-flex select-none justify-center rounded-md px-6 py-2 text-sm font-medium",
                    "bg-pink-9 hover:bg-pink-10 text-white",
                    "border-none outline-none",
                    updateListMutation.isLoading ? "cursor-not-allowed opacity-70" : ""
                  )}
                  onClick={updateList}
                  type="submit"
                >
                  Update 
                </button>
              </div>
            </div>

            <DialogPrimitive.Close
              className={cx(
                "absolute top-3.5 right-3.5 inline-flex items-center justify-center rounded-full p-1",
                "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
              )}
            >
              <Cross1Icon className="h-4 w-4 text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-400" />
            </DialogPrimitive.Close>
          </DialogPrimitive.Content>
        </Transition.Child>
      </Transition.Root>
    </DialogPrimitive.Root>
  );
};
