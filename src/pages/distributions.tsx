import {useInfiniteDistribution} from "@/api/useDistributions";
import useInfiniteTable from "@/api/useInfiniteTable";
import AddDistribution from "@/components/forms/AddDistribution";
import Button from "@/components/global/Button";
import Modal from "@/components/global/Modal";
import Header from "@/components/layout/Header";
import Listing from "@/components/listings/Listing";
import moment from "momnet";
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
    display: "Issued on",
    field: "created_at",
    element: (value: string) => (
      <div className="px-8 py-4 flex flex-col">
        <p className="text-zinc-500 text-xs font-medium">
          {moment(value).format("DD MMM, YYYY")}
        </p>
      </div>
    ),
  },
];

const Distributions: React.FC<DistributionsProps> = ({}) => {
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

  return (
    <>
      <div className="bg-white w-full  h-full ">
        <Header hideCrumbs={true} title="Distributions">
          <Button label="Add new" onClick={() => setShow(true)} />
        </Header>
        <Listing fields={fields} data={tableData} {...tableProps} />˝{" "}
      </div>
      <Modal
        drawerOpen={show}
        title="Add distribution"
        onClose={() => setShow(false)}
      >
        <AddDistribution
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
