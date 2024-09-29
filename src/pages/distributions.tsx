import {
  useDistributionManage,
  useInfiniteDistribution,
} from "@/api/useDistributions";
import useInfiniteTable from "@/api/useInfiniteTable";
import AddDistribution from "@/components/forms/AddDistribution";
import Button from "@/components/global/Button";
import Modal from "@/components/global/Modal";
import DeleteIcon from "@/components/icon/actions/Delete";
import EditIcon from "@/components/icon/actions/Edit";
import Header from "@/components/layout/Header";
import Listing from "@/components/listings/Listing";
import {checkPermissions} from "@/helper/PermissionHelper";
import useConfirmation from "@/hooks/useConfirmation";
import moment from "moment";
import React, {useState} from "react";

interface DistributionsProps {}

const fields = [
  {
    display: "Name",
    field: "staff.name",
    element: (value: string, {name, identifier}: any) => (
      <div className="px-8 py-4 flex flex-col">
        <p className="text-zinc-900 text-sm font-medium">{value}</p>
        <p className="text-zinc-500 text-xs font-medium">{identifier}</p>
      </div>
    ),
  },
  {
    display: "Item",
    field: "item.name",
    textClass: "text-sm text-zinc-500",
  },
  {
    display: "Quantity",
    field: "quantity",
    textClass: "text-sm text-zinc-500 lowercase",
  },
  {
    display: "By",
    field: "user.name",
  },
  {
    display: "Issued on",
    field: "created_at",
    element: (value: string) => (
      <div className="px-8 py-4 flex flex-col">
        <p className="text-zinc-500 text-xs font-medium">
          {/* {moment(value).format("DD MMM, YYYY")} */}
          {moment(value).format("DD-MMM-YYYY HH:mm:ss")}
          {/* {value} */}
        </p>
      </div>
    ),
  },
];

const Distributions: React.FC<DistributionsProps> = ({}) => {
  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const {confirm} = useConfirmation();
  const [currentUrl, setCurrentUrl] = useState("");
  const {deleteDistribution} = useDistributionManage();
  const {
    isLoading,
    data,
    error,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
    hasNextPage,
  } = useInfiniteDistribution(currentUrl);
  const {onPaginate, tableData, search, setSearch, tableProps} =
    useInfiniteTable({
      data,
      isFetchingNextPage,
      fetchNextPage,
      hasNextPage,
      setCurrentUrl,
      initialUrl: "dispatches",
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
                  await deleteDistribution(item);
                  refetch();
                },
              }),
          },
        ]
      : []), // If false, return an empty array

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
      : []), // If false, return an empty array
  ];

  return (
    <>
      <div className="bg-white w-full  h-full ">
        <Header hideCrumbs={true} title="Distributions">
          {checkPermissions("add-staff") ? (
            <Button label="Add new" onClick={() => setShow(true)} />
          ) : (
            <></>
          )}
        </Header>
        <Listing
          actions={actions}
          fields={fields}
          data={tableData}
          {...tableProps}
        />
      </div>
      <Modal
        drawerOpen={show}
        title="Add distribution"
        onClose={() => setShow(false)}
      >
        <AddDistribution
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
export default Distributions;
