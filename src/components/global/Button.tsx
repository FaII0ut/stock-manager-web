import {ButtonProps} from "@headlessui/react";
import React from "react";

interface BtnProps extends ButtonProps {
  label: string;
}

const Button: React.FC<BtnProps> = ({label, ...rest}) => {
  return (
    <>
      <button
        {...rest}
        className="px-4 py-2 rounded-lg bg-black text-white hover:bg-zinc-800 text-sm"
      >
        {label}
      </button>
    </>
  );
};
export default Button;
