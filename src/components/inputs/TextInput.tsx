import React from "react";

interface TextInputProps {
  placeholder: string;
  disabled?: boolean;
  validate?: boolean;
  extraClasses?: string;
  onChange: (item: any) => any;
  title?: string;
  value: string;
  width?: string;
  onEnter?: (item: any) => any;
  inputExtraClasses?: string;
  reference?: any;
  onEmptyBack?: () => void;
}

const TextInput: React.FC<TextInputProps> = ({
  placeholder,
  onChange,
  disabled = false,
  extraClasses,
  validate = false,
  title,
  value = "",
  width = "max-w-[336px]",
  inputExtraClasses = "",
  reference = () => {},
  onEnter = () => {},
  onEmptyBack = () => {},
}) => {
  return (
    <div className={`relative ${width}`}>
      <div
        className={`relative flex justify-end flex-col ${title && "h-[64px]"}`}
      >
        <div className="flex">
          {title ? (
            <p
              className={`text-700 text-sm pb-1.5 font-medium capitalize`}
            >
              {title}
            </p>
          ) : (
            ""
          )}
          {!disabled && validate && title && value == "" ? (
            <p className="text-red-500 pl-1 relative -top-1 ">*</p>
          ) : null}
        </div>
        <div
          className={`relative ${width} group gap-2 flex overflow-hidden border border-[#D0D5DD] rounded-lg ${extraClasses}`}
        >
          <input
            className={`focus:outline-none text-base w-full bg-white px-3 py-2 text-800 ${inputExtraClasses}`}
            type="text"
            ref={reference}
            autoComplete="off"
            placeholder={placeholder}
            disabled={disabled}
            value={value ? value : ""}
            onChange={(e) => {
              onChange(e.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                onEnter(value);
                // Call your function here
              }
              if (event.key === "Backspace" && value === "") {
                onEmptyBack();
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default TextInput;
