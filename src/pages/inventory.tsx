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
import React, {useState} from "react";

interface InventoryProps {}

const fields = [
  {
    display: "Item",
    field: "name",
    element: (value: string, {name, description}: any) => (
      <div className="px-8 py-4 flex flex-col">
        <p className="text-zinc-900 text-sm font-medium">{value}</p>
        <p className="text-zinc-500 text-xs font-medium">{description}</p>
      </div>
    ),
  },
  {
    display: "SKU",
    field: "sku",
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
  const {onPaginate, tableData, search, setSearch, tableProps} =
    useInfiniteTable({
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

  return (
    <>
      <div className="bg-white w-full  h-full ">
        <Header hideCrumbs={true} title="Invetory">
          {checkPermissions("add-staff") ? (
            <Button label="Add new" onClick={() => setShow(true)} />
          ) : (
            <></>
          )}
        </Header>
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
