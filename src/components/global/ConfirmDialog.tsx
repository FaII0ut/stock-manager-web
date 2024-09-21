import {Dialog, Transition} from "@headlessui/react";
import React, {Fragment, useEffect, useState} from "react";
import dynamic from "next/dynamic";
import {useStoreActions, useStoreState} from "../../store/hooks";
import Button from "./Button";
import DeleteIcon from "../icon/actions/Delete";

interface ConfirmDialogProps {
  open: boolean;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({open}) => {
  const show = useStoreState((state) => state.confirmDelete.show);
  const details = useStoreState((action) => action.confirmDelete.details);
  const setResolution = useStoreActions(
    (action) => action.confirmDelete.setResolution
  );

  const onCancel = () => {
    setResolution("cancel");
  };

  const onConfirm = () => {
    setResolution("confirm");
  };

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog
        as="div"
        onClose={() => {}}
        className={`fixed top-0 left-0 flex w-screen min-h-screen h-max bg-transparent justify-center items-center  ${
          show ? "z-[100]" : "hidden z-[-10]"
        }`}
      >
        <>
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
          <Transition
            show={show && open}
            as={Fragment}
            enter="delay-200 transition ease-out duration-200 transform"
            enterFrom="transform opacity-0 "
            enterTo="transform opacity-100"
            leave="transition ease-in duration-200 transform"
            leaveFrom="transform opacity-100"
            leaveTo="transform opacity-0 "
          >
            <div className="z-10 px-12 py-6 bg-zinc-200 rounded-xl flex flex-col items-center justify-center">
              <div className="px-2 rounded-full bg-red-50 w-16 h-16 flex items-center justify-center dark:bg-gray-700 ">
                <div className="px-2 rounded-full bg-red-100 w-10 h-10 flex items-center justify-center dark:bg-gray-600">
                  {details.icon ? details.icon : <DeleteIcon stroke="#fff"/>}
                </div>
              </div>
              <p className="font-medium text-lg text-zinc-800 pt-5 pb-2">
                {details.title}
              </p>
              <p className="text-zinc-500 text-sm max-w-xs text-center">
                {details.description}
              </p>
              <div className="flex w-full gap-3 pt-8 items-center justify-center">
                <Button label={details.btnText[0]} onClick={() => onCancel()} />
                <Button
                  label={details.btnText[1]}
                  onClick={() => onConfirm()}
                />
              </div>
            </div>
          </Transition>
        </>
      </Dialog>
    </Transition.Root>
  );
};
export default ConfirmDialog;
