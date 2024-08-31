import {Dialog, Transition} from "@headlessui/react";
import React, {Fragment, useEffect, useState} from "react";
import Button from "./Button";

interface ModalProps {
  onClose?: () => void;
  drawerOpen: boolean;
  backdrop?: boolean;
  title?: string;
  sub?: string;
  children: JSX.Element;
  pagination?: boolean;
  edit?: boolean;
  size?: string;
  showBorder?: boolean;
  activeStep?: number;
  totalStep?: number;
  hideAction?: boolean;
  btnText?: string;
  processing?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  onClose = () => {},
  drawerOpen = false,
  backdrop = true,
  title,
  sub,
  children = <></>,
  pagination = false,
  edit = false,
  size = "max-w-[400px]",
  showBorder = false,
  activeStep = -1,
  totalStep = 0,
  btnText,
  hideAction = false,
  processing = false,
}) => {
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [reset, setReset] = useState(false);
  const [loading, setLoading] = useState(false);
  const [changed, setChanged] = useState(false);

  const handleToggle = () => {
    console.log("opened");
    if (!open) {
      return;
    }
    setOpen(false);
    onClose();
  };

  useEffect(() => {
    if (!drawerOpen) {
      onClose();
    }
    setOpen(drawerOpen);
  }, [drawerOpen]);

  useEffect(() => {
    return () => {
      setConfirm(false);
    };
  }, []);

  var props = {
    changed: changed,
    confirm: confirm,
    reset: reset,
    cancel: cancel,
    open: open,
    setLoading: (value: boolean) => setLoading(value),
    setConfirm: (value: boolean) => setConfirm(value),
    setReset: (value: boolean) => setReset(value),
    setCancel: (value: boolean) => setCancel(value),
    setChanged: (value: boolean) => setChanged(value),
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden font-inter z-30"
        onClose={() => {}}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="absolute inset-0 bg-gray-100 dark:bg-opacity-70 bg-opacity-65 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-y-0 right-0 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-500"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in duration-100 sm:duration-100"
              leaveFrom="translate-x-0 opacity-80"
              leaveTo="translate-x-full opacity-40"
            >
              <div
                className={`w-screen transition-all duration-1000 delay-200 bg-white ${size} shadow-lg relative rounded-xl m-2 overflow-hidden`}
              >
                <div
                  className={`${
                    hideAction ? "h-full" : "h-[calc(100%-86px)]"
                  }  flex flex-col bg-zinc-10  shadow-xl overflow-y-scroll scrollBarHide pborder-zinc-[100px]`}
                >
                  <div
                    className={`flex justify-between py-6 pl-8 pr-5 border-zinc-50 items-center sticky top-0 bg-zinc-10 z-30 ${
                      showBorder ? "border-b" : ""
                    }`}
                  >
                    <div className="flex flex-col">
                      {title ? (
                        <p className="text-xl font-semibold text-500">
                          {" "}
                          {title}{" "}
                        </p>
                      ) : null}
                      {sub ? <p className="text-sm text-700"> {sub} </p> : null}
                    </div>
                    <button
                      type="button"
                      className="focus:outline-none "
                      onClick={() => {
                        onClose();
                      }}
                    >
                      X
                      {/* <Icon
                        name="actions/Close"
                        stroke={dark ? "#FFF" : "#737373"}
                      /> */}
                    </button>
                  </div>
                  {React.cloneElement(children, {...props})}
                </div>

                <div
                  className={`absolute w-full py-6 px-8 gap-4 bg-white border-t border-zinc-100 bg-zinc-10 z-30 bottom-0 flex justify-end`}
                >
                  <Button
                    label="Cancel"
                    disabled={loading || processing}
                    onSelect={() => {
                      handleToggle();
                      setCancel(true);
                    }}
                  />
                  <Button
                    disabled={loading || processing}
                    label={btnText ? btnText : edit ? "Update" : "Add"}
                    onSelect={() => {
                      !loading && drawerOpen && setConfirm(true);
                    }}
                  />
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default Modal;
