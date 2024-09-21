import {Popover, Transition} from "@headlessui/react";
import React, {Fragment, useRef, useState} from "react";
import moment from "moment";
import CalendarIcon from "../icon/Calendar";
const {Calendar} = require("@fall-out/react-calendar");

interface DatePickerProps {
  disabled?: boolean;
  extraClasses?: string;
  onChange: (item: any) => any;
  title?: string;
  value?: string;
  direction?: string;
  width?: string;
  displayFormat?: string;
  outputFormat?: string;
  cta?: any;
}

const DatePicker: React.FC<DatePickerProps> = ({
  // name,
  // icon,
  onChange,
  disabled = false,
  extraClasses,
  title,
  value = moment().format("YYYY-MM-DD"),
  direction = "",
  width = "max-w-[336px]",
  displayFormat = "MMM, DD YYYY",
  outputFormat = "YYYY-MM-DD",
  cta,
}) => {
  const [selectedItem, setSelectedItem] = useState();
  const [query, setQuery] = useState("");
  const inputRef = useRef<any>();
  const popperElement = useRef<any>();
  const dark = false;
  const theme = "dafault";
  const [dateValue, setDateValue] = useState<string>(
    value ? moment(value).format(displayFormat) : value
  );

  // useEffect(() => {
  //     if (!defaultValue) {
  //         return;
  //     }
  //     setDateValue(moment(defaultValue).format(displayFormat))
  //     onError(false)
  // }, [defaultValue]);

  const validateChange = (value: string | undefined, onClose?: any) => {
    if (!!!value) {
      setDateValue("");
      return;
    }
    setDateValue(moment(value).format(displayFormat));
    if (!moment(value).isValid()) {
      // onError(true)
      return;
    }
    // onError(false)
    onChange(moment(value).format(outputFormat));
  };

  const themes: any = {
    default: ` ${
      disabled ? "bg-gray-200 cursor-not-allowed" : "bg-white dark:bg-gray-25 "
    }`,
    delete: `${
      disabled
        ? "bg-gray-200 cursor-not-allowed"
        : " bg-red-600 text-gray-100 hover:bg-red-700"
    }`,
    ghost: `${
      disabled
        ? "bg-white-200 cursor-not-allowed"
        : "bg-transparent text-gray-500 cursor-pointer hover:bg-gray-50 dark:bg-gray-10 dark:hover:bg-gray-700"
    }`,
  };

  const borderTheme: any = {
    default: `border ${
      disabled ? "b-200" : " focus-within:border-primary-500 b-200"
    }`,
    delete: `border ${disabled ? "b-200" : " border-red-600"}`,
    ghost: `border ${disabled ? "b-200" : "b-200 hover:b-600"}`,
  };

  const textTheme: any = {
    default: `${disabled ? "text-white" : "text-25"}`,
    delete: `${disabled ? "text-white" : "text-100"}`,
    ghost: `${disabled ? "text-200" : "text-500 group-hover:text-25"}`,
  };

  const iconTheme: any = {
    default: `${
      disabled ? (dark ? "#404040" : "#D4D4D4") : dark ? "#FFF" : "#737373"
    }`,
    delete: `${disabled ? "#FFF" : "#F5F5F5"}`,
    ghost: `${
      disabled ? (dark ? "#404040" : "#D4D4D4") : dark ? "#FFF" : "#737373"
    }`,
  };

  return (
    <div className="relative w-full fallout">
      <Popover>
        <div className="relative">
          {title ? (
            <p
              className={`text-gray-700 text-sm pb-1.5 font-medium ${textTheme[theme]}`}
            >
              {title}
            </p>
          ) : (
            ""
          )}
          {cta ? (
            <Popover.Button
              ref={inputRef}
              className={`flex gap-2 items-center w-full ${
                disabled ? "cursor-not-allowed" : ""
              }`}
            >
              {cta(
                new Date(dateValue),
                inputRef,
                extraClasses,
                borderTheme[theme]
              )}
            </Popover.Button>
          ) : (
            <div
              className={`relative ${width} group gap-2  pl-3 bg-white flex overflow-hidden rounded-lg ${extraClasses} border border-zinc-300`}
            >
              <Popover.Button
                ref={inputRef}
                className={`flex gap-2 items-center ${
                  disabled ? "cursor-not-allowed" : ""
                }`}
              >
                <CalendarIcon />
              </Popover.Button>
              <input
                className={`w-full focus:outline-none  px-3 py-2 pl-0 bg-white text-800`}
                type="text"
                placeholder="YYYY-MM-DD"
                onBlur={(e) => {
                  validateChange(e.target.value);
                }}
                disabled={disabled}
                // defaultValue={defaultValue ? defaultValue : ""}
                value={dateValue ? dateValue : ""}
                onChange={(e) => {
                  setDateValue(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    validateChange(dateValue);
                  }
                }}
              />
            </div>
          )}
          {/* <Transition
            as={Fragment}
            enter="transition ease-out duration-200 transform"
            enterFrom="transform opacity-0 -translate-y-[5px]"
            enterTo="transform opacity-100 translate-y-0"
            leave="transition ease-in duration-200 transform"
            leaveFrom="transform opacity-100 translate-y-0"
            leaveTo="transform opacity-0 -translate-y-[5px]"
          > */}
          <Popover.Panel
            ref={popperElement}
            className={`absolute shadow-lg z-10 py-1 mt-1 px-1 pb-5 pt-3 rounded-lg border bg-white border-gray-100 ${direction}`}
          >
            <Calendar
              calendarType="Hebrew"
              extraHtml={() => <div className="h-4"></div>}
              onChange={(date: string) => validateChange(date)}
              value={dateValue ? new Date(dateValue) : new Date()}
            />
          </Popover.Panel>
          {/* </Transition> */}
        </div>
      </Popover>
    </div>
  );
};
export default DatePicker;
