import useInfiniteTable from "@/api/useInfiniteTable";
import {useInfiniteUsers} from "@/api/useUsers";
import CreateUser from "@/components/forms/CreateUser";
import Button from "@/components/global/Button";
import Modal from "@/components/global/Modal";
import Header from "@/components/layout/Header";
import Listing from "@/components/listings/Listing";
import React, {useState} from "react";

interface UsersProps {}

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

const Users: React.FC<UsersProps> = ({}) => {
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
  } = useInfiniteUsers(currentUrl);
  const {onPaginate, tableData, search, setSearch, tableProps} =
    useInfiniteTable({
      data,
      isFetchingNextPage,
      fetchNextPage,
      hasNextPage,
      setCurrentUrl,
      initialUrl: "users",
    });

  return (
    <>
      <div className="bg-white w-full  h-full ">
        <Header hideCrumbs={true} title="Users">
          <Button label="Add new" onClick={() => setShow(true)} />
        </Header>
        <Listing fields={fields} data={tableData} {...tableProps} />
      </div>
      <Modal
        drawerOpen={show}
        title="Create User"
        onClose={() => setShow(false)}
      >
        <CreateUser
          onCreate={() => {
            setShow(false);
            refetch();
          }}
        />
      </Modal>
    </>
  );
};
export default Users;
