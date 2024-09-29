import useInfiniteTable from "@/api/useInfiniteTable";
import {useInfiniteStaffs} from "@/api/useStaffs";
import CreateStaff from "@/components/forms/CreateStaff";
import Button from "@/components/global/Button";
import Modal from "@/components/global/Modal";
import Header from "@/components/layout/Header";
import Listing from "@/components/listings/Listing";
import {checkPermissions} from "@/helper/PermissionHelper";
import React, {useState} from "react";

interface StaffsProps {}

const fields = [
  {
    display: "Name",
    field: "name",
    element: (value: string, {name, identifier}: any) => (
      <div className="px-8 py-4 flex flex-col">
        <p className="text-zinc-900 text-sm font-medium">{value}</p>
        <p className="text-zinc-500 text-xs font-medium">{identifier}</p>
      </div>
    ),
  },
  {
    display: "National id",
    field: "nid",
    textClass: "text-sm text-zinc-500 ",
  },
];

const Staffs: React.FC<StaffsProps> = ({}) => {
  const [show, setShow] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const {
    isLoading,
    data,
    error,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
    hasNextPage,
  } = useInfiniteStaffs(currentUrl);
  const {onPaginate, tableData, search, setSearch, tableProps} =
    useInfiniteTable({
      data,
      isFetchingNextPage,
      fetchNextPage,
      hasNextPage,
      setCurrentUrl,
      initialUrl: "staff",
    });

  return (
    <>
      <div className="bg-white w-full  h-full ">
        <Header hideCrumbs={true} title="Staffs">
          {checkPermissions("add-staff") ? (
            <Button label="Add new" onClick={() => setShow(true)} />
          ) : (
            <></>
          )}
        </Header>
        <Listing fields={fields} data={tableData} {...tableProps} />
      </div>
      <Modal
        drawerOpen={show}
        title="Create Staff"
        onClose={() => setShow(false)}
      >
        <CreateStaff
          onCreate={() => {
            setShow(false);
            refetch();
          }}
        />
      </Modal>
    </>
  );
};
export default Staffs;
