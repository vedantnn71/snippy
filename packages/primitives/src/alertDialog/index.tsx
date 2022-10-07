import { Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { IAlertDialogProps } from "./types";
import cx from "classnames";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

export const AlertDialog = ({
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmLabel = "Confirm",
  trigger,
  onConfirm,
  onCancel,
}: IAlertDialogProps) => {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <AlertDialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogPrimitive.Trigger asChild>
        {trigger}
      </AlertDialogPrimitive.Trigger>
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
          <AlertDialogPrimitive.Overlay
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
          <AlertDialogPrimitive.Content
            forceMount
            className={cx(
              "fixed z-50",
              "w-[95vw] max-w-md rounded-lg p-4 md:w-full",
              "top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]",
              "bg-slate-11.5"
            )}
            onCloseAutoFocus={(evt) => evt.preventDefault()}
          >
            <h1 className="text-sm font-medium text-gray-100">{title}</h1>
            <AlertDialogPrimitive.Description className="mt-2 text-sm font-normal text-gray-400">
              {description}
            </AlertDialogPrimitive.Description>
            <div className="mt-4 flex justify-end space-x-2">
              <AlertDialogPrimitive.Cancel
                className={cx(
                  "inline-flex select-none justify-center rounded-md px-4 py-2 text-sm font-medium",
                  "bg-slate-11.5 hover:bg-slate-12 text-gray-100",
                  "border-none"
                )}
                onClick={() => {
                  onCancel?.();
                  setIsOpen(false);
                }}
              >
                Cancel
              </AlertDialogPrimitive.Cancel>
              <AlertDialogPrimitive.Action
                className={cx(
                  "inline-flex select-none justify-center rounded-md px-4 py-2 text-sm font-medium",
                  "bg-red-9 bg-red-10 text-gray-100",
                  "border-none"
                )}
                onClick={() => onConfirm?.()}
              >
                {confirmLabel || "Confirm"}
              </AlertDialogPrimitive.Action>
            </div>
          </AlertDialogPrimitive.Content>
        </Transition.Child>
      </Transition.Root>
    </AlertDialogPrimitive.Root>
  );
};
