import useInfiniteTable from "@/api/useInfiniteTable";
import {useInfiniteInventory, useInventoryManage} from "@/api/useInventory";
import AddInventory from "@/components/forms/AddInventory";
import CreateStaff from "@/components/forms/CreateStaff";
import Button from "@/components/global/Button";
import Modal from "@/components/global/Modal";
import DeleteIcon from "@/components/icon/actions/Delete";
import EditIcon from "@/components/icon/actions/Edit";
import Header from "@/components/layout/Header";
import Listing from "@/components/listings/Listing";
import {checkPermissions} from "@/helper/PermissionHelper";
import useConfirmation from "@/hooks/useConfirmation";
import {useStoreActions} from "@/store/hooks";
import React, {useEffect, useState} from "react";
// import {july} from "../../public/inventory/july";
import moment from "moment";
import TextInput from "@/components/inputs/TextInput";
import BondedIcon from "@/components/icon/Bonded";
import {exportToExcel} from "@/helper/exportHelper";
import axios from "@/api/axios";

interface InventoryProps {}

const fields = [
  {
    display: "Item",
    field: "name",
    element: (value: string, {name, description, min_count, stock}: any) => (
      <div className="px-8 py-4 flex flex-col relative">
        <div className="flex flex-row items-center space-x-1">
          <p className="text-zinc-900 text-sm font-semibold">{value}</p>
          {stock < min_count ? <BondedIcon /> : null}
        </div>
        <p className="text-zinc-500 text-xs font-medium">{description}</p>
      </div>
    ),
  },
  {
    display: "Item code",
    field: "code",
    element: (value: string, {category}: any) => (
      <div className="px-8 py-4 flex flex-col relative">
        <div className="flex flex-row items-center space-x-1">
          <p className="text-zinc-900 text-sm font-medium">{value}</p>
        </div>
        <p className="text-zinc-500 text-xs font-medium">{category?.name}</p>
      </div>
    ),
  },
  {
    display: "PAR",
    field: "min_count",
    textClass: "text-sm text-zinc-500",
  },
  {
    display: "Price",
    field: "price",
    textClass: "text-sm text-zinc-500",
  },
  {
    display: "Stock",
    field: "stock",
    textClass: "text-sm text-zinc-500",
  },
];
const Inventory: React.FC<InventoryProps> = ({}) => {
  const [selectedItem, setSelectedItem] = useState();
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const {confirm} = useConfirmation();
  const setShowConfirm = useStoreActions(
    (action) => action.confirmDelete.setShow
  );
  const {deleteInventoryItem} = useInventoryManage();
  const [currentUrl, setCurrentUrl] = useState("");
  const {
    isLoading,
    data,
    error,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
    hasNextPage,
  } = useInfiniteInventory(currentUrl);
  const {onPaginate, tableData, tableProps} = useInfiniteTable({
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    setCurrentUrl,
    initialUrl: "items",
  });

  const actions: any = [
    ...(checkPermissions("delete-inventory")
      ? [
          {
            icon: <DeleteIcon />,
            isVisible: () => true,
            action: (item: any) =>
              confirm({
                onCancel: () => {
                  return true;
                },
                onConfirm: async () => {
                  await deleteInventoryItem(item);
                  refetch();
                },
              }),
          },
        ]
      : []),
    ...(checkPermissions("edit-inventory")
      ? [
          {
            icon: <EditIcon />,
            isVisible: () => true,
            action: (item: any) => {
              setSelectedItem(item);
              setShow(true);
            },
          },
        ]
      : []),
  ];

  // const {createInventory} = useInventoryManage();
  // const [index, setIndex] = useState(0);
  // const [loading, setLoading] = useState(false);

  // const handleSave = async () => {
  //   if (loading) {
  //     return;
  //   }
  //   setLoading(true);
  //   try {
  //     const response = await createInventory({
  //       ...july[index],
  //       sku: moment().unix(),
  //       price: 1,
  //     });
  //     if (response.status === 201 || response.status === 200) {
  //       setLoading(false);
  //       setIndex(index + 1);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   if (loading) {
  //     return;
  //   }
  //   setTimeout(() => {
  //     handleSave();
  //   },1000)

  //   // handleSave()
  // }, [index]);

  useEffect(() => {
    setCurrentUrl(`items?search=${search}`);
  }, [search]);

  const exportInventory = async () => {
    try {
      const response = await axios.get("/items/export/json");
      exportToExcel(response.data.items, "file");
    } catch (error) {}
  };

  return (
    <>
      <div className="bg-white w-full  h-full ">
        <Header hideCrumbs={true} title="Invetory">
          {checkPermissions("add-staff") ? (
            <>
              <Button label="Export" onClick={() => exportInventory()} />
              <Button label="Add new" onClick={() => setShow(true)} />
            </>
          ) : (
            <></>
          )}
        </Header>
        <div className="px-6 pt-6 pb-3 w-1/3">
          <TextInput
            title=""
            onChange={setSearch}
            value={search}
            width="w-full"
            placeholder="search"
          />
        </div>
        <Listing
          fields={fields}
          data={tableData}
          {...tableProps}
          actions={actions}
        />
      </div>
      <Modal drawerOpen={show} title="Add Item" onClose={() => setShow(false)}>
        <AddInventory
          item={selectedItem}
          onCreate={() => {
            setShow(false);
            refetch();
          }}
        />
      </Modal>
    </>
  );
};
export default Inventory;
