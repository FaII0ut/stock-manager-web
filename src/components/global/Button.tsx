import {ButtonProps} from "@headlessui/react";
import React from "react";

interface BtnProps extends ButtonProps {
  label: string;
  widthClass?: string;
}

const Button: React.FC<BtnProps> = ({label, widthClass, ...rest}) => {
  return (
    <>
      <button
        {...rest}
        className={`px-4 py-2 rounded-lg bg-black text-white hover:bg-zinc-800 text-sm ${widthClass}`}
      >
        {label}
      </button>
    </>
  );
};
export default Button;
