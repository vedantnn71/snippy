import { Transition } from "@headlessui/react";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Fragment, useState } from "react";
import { Icon } from "@snippy/primitives";
import { trpc } from "@/utils/trpc";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import cx from "classnames";

export const ApiKeyModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [clipboardIcon, setClipboardIcon] = useState("clipboard");
  const [error, setError] = useState<string | null>();
  const apiKeyQuery = trpc.apiKey.byUserId.useQuery();
  const hiddenApiKey = apiKeyQuery.data?.slice(0, 3) + "********";
  const utils = trpc.useContext();

  const apiKeyMutation = trpc.apiKey.regenerate.useMutation({
    onSuccess: () => {
      utils.apiKey.byUserId.invalidate();
    },
  });

  const regenerateApiKey = async () => {
    apiKeyMutation.mutateAsync();
  };

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKeyQuery?.data!);
  };

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <DialogPrimitive.Trigger asChild>
        <div
          onClick={() => setIsOpen(true)}
          className="align-center flex w-full cursor-pointer gap-2 outline-none"
        >
          <Icon size={16} type="regular" name="key" className="my-auto" />
          Api Key
        </div>
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
            className="fixed inset-0 z-20 bg-[#1b1b1b75] min-w-[100vw] min-h-[110vh] backdrop-blur-sm translate-y-[-70%]"
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
              "min-w-[50vw] max-w-lg rounded-lg p-8 md:w-full",
              "top-[50%] left-[50%] -translate-x-[-40%] -translate-y-[145%]",
              "bg-slate-11.5",
              "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
            )}
          >
            <h1 className="text-sm font-medium text-gray-100">Your Api Key</h1>

            <DialogPrimitive.Description className="text-slate-4 mt-2 text-sm font-normal">
              Get your api key to use for the snippy cli and extensionns.
            </DialogPrimitive.Description>

            <div className="mt-2 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-md font-medium text-slate-7">
                    {showKey ? apiKeyQuery.data : hiddenApiKey}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setShowKey((prev) => !prev)}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-11.5 hover:bg-slate-11.5 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                  >
                    <Icon
                      type="regular"
                      size={20}
                      name={showKey ? "show" : "low-vision"}
                    />
                  </button>

                  <button
                    className="hover:text-green-8 cursor-pointer"
                    onClick={() => {
                      copyApiKey();
                      setClipboardIcon("check");
                      setTimeout(() => {
                        setClipboardIcon("clipboard");
                      }, 1500);
                    }}
                  >
                    <Icon type="regular" name={clipboardIcon} size={20} />
                  </button>
                </div>
              </div>

              {error && (
                <div className="text-red-9 flex flex-col gap-1 text-sm font-normal">
                  <h3 className="font-semibold">Error</h3>
                  <span>{error}</span>
                </div>
              )}

              <div className="flex justify-end items-center gap-4">
                <button
                  className={cx(
                    "inline-flex select-none justify-center rounded-md px-6 py-2 text-sm font-medium",
                    "bg-slate-11.5 hover:bg-slate-11 border border-slate-11 text-white mt-5",
                    "outline-none",
                    apiKeyMutation.isLoading
                      ? "cursor-not-allowed opacity-70"
                      : ""
                  )}
                  onClick={() => setIsOpen(false)}
                  type="submit"
                >
                  Close
                </button>

                <button
                  className={cx(
                    "inline-flex select-none justify-center rounded-md px-6 py-2 text-sm font-medium",
                    "bg-pink-9 hover:bg-pink-10 text-white mt-5",
                    "border-none outline-none",
                    apiKeyMutation.isLoading
                      ? "cursor-not-allowed opacity-70"
                      : ""
                  )}
                  onClick={regenerateApiKey}
                  type="submit"
                >
                  Regenerate
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
