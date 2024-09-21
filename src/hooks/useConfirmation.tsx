import { useEffect, useState } from "react";
import { useStoreActions, useStoreState } from "../store/hooks";

const defaultPromise = () => {
  // await new Promise((resolve, reject) => resolve(true));
  return true;
};

const useConfirmation = () => {
  const [promise, setPromise] = useState<any>(null);
  const resolution = useStoreState((state) => state.confirmDelete.resolution);
  const setShow = useStoreActions((action) => action.confirmDelete.setShow);
  const [onCancelCallback, setOnCancel] = useState<any>(defaultPromise);
  const [onConfirmCallback, setOnConfirm] = useState<any>(defaultPromise);
  const setResolution = useStoreActions(
    (action) => action.confirmDelete.setResolution,
  );

  const confirm = ({ onConfirm, onCancel }: any) => {
    setShow(true);
    // console.log('onConfirm', onConfirm);
    setOnCancel(() => onCancel);
    setOnConfirm(() => onConfirm);
  };

  const handleClose = () => {
    setPromise(null);
    setShow(false);
    setResolution("undecided");
    setOnCancel(defaultPromise);
    setOnConfirm(defaultPromise);
  };

  useEffect(() => {
    return () => {
      setShow(false);
      setOnCancel(defaultPromise);
      setOnConfirm(defaultPromise);
    };
  }, []);

  useEffect(() => {
    switch (resolution) {
      case "confirm":
        handleConfirm();
        break;
      case "cancel":
        handleCancel();
        break;
      default:
        break;
    }
  }, [resolution]);

  const handleConfirm = async () => {
    promise?.resolve(true);
    if (typeof onConfirmCallback === "function" && onConfirmCallback()) {
      handleClose();
    }
  };

  const handleCancel = async () => {
    promise?.resolve(false);
    if (typeof onCancelCallback === "function" && onCancelCallback()) {
      handleClose();
    }
  };

  return { confirm };
};
export default useConfirmation;
