import React, {useEffect, useState} from "react";
import InView from "../global/InView";

interface ListingProps {
  fields: field[];
  actions?: any[];
  showChevron?: boolean;
  handleAction?: (action: string, item: object) => void;
  onRowClick?: (item: object) => void;
  data: any[];
  rowClickable?: boolean;
  heading?: string;
  emptyMessage?: string;
  selectable?: boolean;
  clearSelected?: boolean;
  emptyType?: "gray" | "white";
  onSelect?: (item?: any) => void;
  onPaginate?: (item?: any) => void;
  showOverflow?: boolean;
  disableCopy?: boolean;
}

interface field {
  display: string;
  field: string;
  containerClasses?: string;
  containerClass?: string;
  textClass?: string;
  headerClass?: string;
  element?: (item: string, obj: object, disableCopy: boolean) => JSX.Element;
  header?: (item: string) => JSX.Element;
}

const Listing: React.FC<ListingProps> = ({
  fields,
  heading = "",
  clearSelected = false,
  emptyMessage = "",
  emptyType = "gray",
  data = [],
  actions = [],
  handleAction = () => {},
  onRowClick = () => {},
  showChevron = true,
  rowClickable = true,
  selectable = false,
  onSelect = () => {},
  onPaginate = () => {},
  disableCopy = false,
  showOverflow = false,
}) => {
  const [list, setList] = useState<any[]>(data);
  const [selected, setSelected] = useState<any[]>([]);
  const [remove, setRemove] = useState<any[]>([]);

  const getValue = (id: string, row: object) => {
    var attributes = id.split(".");
    var value = JSON.parse(JSON.stringify(row));
    attributes &&
      attributes.length &&
      attributes.forEach((attribute) => {
        value =
          value && value.hasOwnProperty(attribute) ? value[attribute] : null;
      });
    return value;
  };

  const toggleItem = (item: any) => {
    if (item.selected) {
      setRemove([...remove, item]);
    }
    const find = selected.find((x) => x.id == item.id);
    find ? removeItem(item) : addItem(item);
  };

  const addItem = (item: any) => {
    const check = [...selected, item];
    setSelected([...check]);
  };

  const removeItem = (item: any) => {
    const temp = selected.filter((x) => x.id != item.id);
    setSelected([...temp]);
  };

  const handleRowClick = (item: any) => {
    if (!rowClickable) {
      return;
    }
    if (!selectable) {
      onRowClick(item);
      return;
    }
    toggleItem(item);
  };

  useEffect(() => {
    onSelect(selected);
    // setList([...list]);
  }, [selected, remove]);

  useEffect(() => {
    console.log(data);

    //   setList(data);
    clearSelected && setSelected([]);
  }, [data]);
  return (
    // removed overflow-hidden
    <div
      className={`relative w-full ${showOverflow ? "" : "overflow-hidden"} `}
    >
      <table className="w-full ">
        {heading.length ? (
          <thead
            className={`bg-zinc-25 shadow-sm ${
              showOverflow ? "overflow-hidden" : ""
            } rounded-t-xl w-full`}
          >
            <tr>
              <td>
                <p className="text-lg font-medium px-6 py-5 text-700">
                  {heading}
                </p>
              </td>
            </tr>
          </thead>
        ) : null}
        {data.length > 0 ? (
          <thead
            className={`bg-zinc-50 shadow-sm ${
              showOverflow ? "overflow-hidden" : ""
            } rounded-t-xl w-full`}
          >
            <tr className="">
              {selectable ? (
                <td className="w-0">
                  <div></div>
                </td>
              ) : null}
              {fields.map(
                (
                  {
                    display,
                    header,
                    containerClasses,
                    headerClass = "flex justify-start px-4 py-3",
                  }: field,
                  index
                ) => (
                  <th key={index + "h"} className={`${containerClasses}`}>
                    {header ? (
                      header(display)
                    ) : (
                      <div className={` ${headerClass}`}>
                        <p className="font-medium text-sm text-zinc-500 px-4">
                          {display}
                        </p>
                      </div>
                    )}
                  </th>
                )
              )}
              {actions.length ? <th key={"actions"}></th> : null}
              {showChevron ? <th key={"chevron"}></th> : null}
            </tr>
          </thead>
        ) : null}
        <tbody className="overflow-scroll">
          {data?.map((item: any, dataIndex: number) => (
            <tr
              key={dataIndex}
              className={`group cursor-pointer border-gray-50 border-t-[1px] ${
                rowClickable ? "hover:bg-zinc-10" : ""
              }`}
              onClick={() => handleRowClick(item)}
            >
              {fields.map(
                (
                  {
                    field,
                    element,
                    containerClass = "flex px-8 py-5 ",
                    textClass = "text-zinc-400 text-sm group-hover:text-zinc-900",
                  }: field,
                  index
                ) => (
                  <td key={index + "f"}>
                    {element ? (
                      element(
                        getValue(field, item),
                        {
                          ...item,
                          index: dataIndex,
                        },
                        disableCopy
                      )
                    ) : (
                      <div className={`${containerClass}`}>
                        <p className={`${textClass}`}>
                          {getValue(field, item)}
                        </p>
                      </div>
                    )}
                  </td>
                )
              )}
              {actions.length ? (
                <td>
                  <div className="flex gap-4 justify-end pr-4 group-hover:opacity-100 opacity-0">
                    {actions.map(({icon, isVisible, action}: any, index) => (
                      <div
                        key={index + "a"}
                        className="flex items-center hover:bg-zinc-100 w-10 h-10 justify-center rounded transition-colors duration-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          action(item);
                        }}
                      >
                        {icon}
                        {/* <Icon name={`actions/${action}`} stroke="#737373" /> */}
                      </div>
                    ))}
                  </div>
                </td>
              ) : null}
              {showChevron ? (
                <td className="transition-opacity duration-200 opacity-0 group-hover:opacity-100 px-4 w-5">
                  <div className="flex h-full w-full justify-end">
                    {/* <Icon name="actions/ChevronRight" stroke="#15B7B1" /> */}
                  </div>
                </td>
              ) : null}
            </tr>
          ))}
          {data.length == 0 ? (
            <tr
              className={`group cursor-pointer border-b ${
                emptyType == "gray" ? "bg-zinc-10" : "bg-zinc-25"
              } border-zinc-50`}
            >
              <td
                colSpan={6}
                className={`flex px-8 py-6  ${
                  emptyType == "gray" ? "" : "justify-center"
                } `}
              >
                <p className="text-zinc-400 text-sm">
                  {emptyMessage ? emptyMessage : "None Added"}{" "}
                </p>
              </td>
            </tr>
          ) : null}
          <tr className="opacity-0">
            <td>
              <InView callback={onPaginate} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default Listing;
