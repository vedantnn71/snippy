import { IToastProps } from "./types";
import * as ToastPrimitive from "@radix-ui/react-toast";
import cx from "classnames";
import { useState } from "react";

export const Toast = ({ title, description, children }: IToastProps) => {
  const [open, setOpen] = useState(false);

  return (
    <ToastPrimitive.Provider>
      <div
        onClick={() => {
          if (open) {
            setOpen(false);
            setTimeout(() => {
              setOpen(true);
            }, 400);
          } else {
            setOpen(true);
          }
        }}
      >
        {children}
      </div>
      <ToastPrimitive.Root
        open={open}
        onOpenChange={setOpen}
        className={cx(
          "fixed inset-x-4 bottom-4 z-50 w-auto rounded-lg shadow-lg md:top-4 md:right-4 md:left-auto md:bottom-auto md:w-full md:max-w-sm",
          "bg-white dark:bg-gray-800",
          "radix-state-open:animate-toast-slide-in-bottom md:radix-state-open:animate-toast-slide-in-right",
          "radix-state-closed:animate-toast-hide",
          "radix-swipe-end:animate-toast-swipe-out",
          "translate-x-radix-toast-swipe-move-x",
          "radix-swipe-cancel:translate-x-0 radix-swipe-cancel:duration-200 radix-swipe-cancel:ease-[ease]",
          "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
        )}
      >
        <div className="flex">
          <div className="flex w-0 flex-1 items-center py-4 pl-5">
            <div className="radix w-full">
              <ToastPrimitive.Title className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {title}
              </ToastPrimitive.Title>
              <ToastPrimitive.Description className="mt-1 text-sm text-gray-700 dark:text-gray-400">
                {description}
              </ToastPrimitive.Description>
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-col space-y-1 px-3 py-2">
              <div className="flex h-0 flex-1">
                <ToastPrimitive.Close className="flex w-full items-center justify-center rounded-lg border border-transparent px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 dark:text-gray-100 dark:hover:bg-gray-900">
                  Dismiss
                </ToastPrimitive.Close>
              </div>
            </div>
          </div>
        </div>
      </ToastPrimitive.Root>

      <ToastPrimitive.Viewport />
    </ToastPrimitive.Provider>
  );
};
