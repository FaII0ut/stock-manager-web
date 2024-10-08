import {Combobox, Menu, Transition} from "@headlessui/react";
import React, {Fragment, useDeferredValue, useEffect, useState} from "react";
// import Icon from '../icon/Icon'
import dynamic from "next/dynamic";
import axios from "@/api/axios";
import ChevDown from "../icon/ChevDown";

interface item {
  id: string;
  name: string;
  display_name?: string;
}

interface ApiSearchProps {
  name?: string;
  disabled?: boolean;
  extraClasses?: string;
  title?: string;
  onChange: (item: any) => any;
  displayValue?: (item: any) => string;
  defaultSelected?: item;
  validate?: boolean;
  url: string;
  width?: string;
  position?: string;
  renderElement?: (item: any, selected?: any) => JSX.Element;
  charLimit?: number;
  autoTrigger?: boolean;
  placeholder?: string;
}

const ApiSearch: React.FC<ApiSearchProps> = ({
  url,
  name = "",
  title,
  charLimit,
  autoTrigger = false,
  onChange,
  disabled = false,
  placeholder = "Search",
  extraClasses,
  defaultSelected,
  renderElement,
  validate = false,
  position = "top-[66px]",
  displayValue = (item: item) =>
    item ? (item.display_name ? item.display_name : item.name) : "",
  width = "max-w-[336px]",
}) => {
  const [selected, setSelected] = useState<any>({id: "none", name: ""});
  const [query, setQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState<Array<item>>([]);
  const searchedValue = useDeferredValue(query);
  const theme = "default";
  // useEffect(() => {
  //     getSearchItems('')
  // }, [])

  useEffect(() => {
    getSearchItems(searchedValue);
  }, [searchedValue]);

  const getSearchItems = async (query: string) => {
    var parameter;

    if (query == "") {
      console.log("oalaa");
      setSelected({id: "none", name: ""});
      // return;
    }
    parameter = {
      params: {
        search: query,
      },
    };
    try {
      const response = await axios.get(url, parameter);
      if (response.status == 200) {
        console.log(response.data.data.data);
        setFilteredItems(response.data.data);
        if (autoTrigger && charLimit && charLimit === query.length) {
          if (response.data.data.length === 1) {
            onChange(response.data.data[0]);
            setQuery("");
            return;
          }
        }
      }
    } catch (error) {
      // setLoading(false);
    }
  };

  useEffect(() => {
    if (!defaultSelected || defaultSelected.id == selected.id) {
      return;
    }
    setSelected(defaultSelected);
  }, [defaultSelected]);

  useEffect(() => {
    console.log("banana", selected);
    onChange(selected?.id == "none" ? null : selected);
    // setSelected({id: "none", name: ""})
  }, [selected]);

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
      disabled
        ? "opacity-20"
        : validate && selected
        ? "border-red-300"
        : " focus-within:border-primary-500 b-200"
    }`,
    delete: `border ${
      disabled
        ? "b-200"
        : validate && selected
        ? "border-red-300"
        : " border-red-600"
    }`,
    ghost: `border ${
      disabled
        ? "b-200"
        : validate && selected
        ? " border-red-300"
        : "b-200 hover:b-600"
    }`,
  };

  const textTheme: any = {
    default: `${
      disabled
        ? "dark:text-gray-100 text-gray-25"
        : "dark:text-gray-100 text-gray-25"
    }`,
    delete: `${disabled ? "text-white" : "text-gray-100"}`,
    ghost: `${
      disabled
        ? "text-gray-200 dark:text-gray-700"
        : "text-gray-500 group-hover:text-gray-25 dark:text-white dark:group-hover:text-white"
    }`,
  };

  const additionalProps = autoTrigger
    ? {value: query}
    : {displayValue: displayValue};

  return (
    <div className="w-full relative">
      <Combobox value={selected} onChange={setSelected} disabled={disabled}>
        <div className="flex flex-col">
          <div className="flex">
            {title ? (
              <p className={`text-700 text-sm pb-1.5 font-medium capitalize`}>
                {title}
              </p>
            ) : (
              ""
            )}
          </div>
          <div
            className={`relative ${width} group gap-2 bg-50 flex overflow-hidden px-3 py-2 rounded-lg ${extraClasses} ${borderTheme[theme]}`}
          >
            <Combobox.Input
              className="focus:outline-none w-full text-base bg-50 text-700"
              {...additionalProps}
              name={name}
              autoComplete="off"
              onChange={(event) => setQuery(event.target.value)}
              placeholder={placeholder}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevDown />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            // afterLeave={() => setQuery('')}
          >
            <Combobox.Options
              className={`absolute ${position} max-h-64 overflow-scroll z-10 flex flex-col gap-1 p-1 w-full ${width} border rounded-lg drop-shadow-lg bg-white outline-none b-100`}
            >
              {filteredItems.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4  text-zinc-700">
                  Nothing found.
                </div>
              ) : (
                filteredItems.map((item) => {
                  return renderElement ? (
                    renderElement(item, selected)
                  ) : (
                    <Combobox.Option
                      key={item.id}
                      value={item}
                      className={({active}) =>
                        `flex item-center px-4 outline-none py-2 rounded cursor-pointer gap-2 ${
                          active ? "bg-zinc-100" : ""
                        } ${selected?.id == item.id ? "bg-zinc-100" : ""}`
                      }
                    >
                      <p className="text-sm text-zinc-900">
                        {item.display_name ? item.display_name : item.name}
                      </p>
                      {selected?.id == item.id ? (
                        <div className="flex ml-auto items-center">X</div>
                      ) : null}
                    </Combobox.Option>
                  );
                })
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};
export default ApiSearch;
