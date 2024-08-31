import AddDistribution from "@/components/forms/AddDistribution";
import Button from "@/components/global/Button";
import Modal from "@/components/global/Modal";
import Input from "@/components/inputs/Input";
import Header from "@/components/layout/Header";
import Listing from "@/components/listings/Listing";
import moment from "momnet";
import React, {useState} from "react";

interface DistributionsProps {}

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
    display: "Item",
    field: "item",
    textClass: "text-sm text-zinc-500",
  },
  {
    display: "Quantity",
    field: "quantity",
    textClass: "text-sm text-zinc-500 lowercase",
  },
  {
    display: "Issued on",
    field: "issued_on",
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
  return (
    <>
      <div className="bg-white w-full  h-full ">
        <Header hideCrumbs={true} title="Distributions">
          <Button label="Add new" onClick={() => setShow(true)} />
        </Header>
          <Listing
            fields={fields}
            data={[
              {
                name: "Ali",
                identifier: "A221122",
                quantity: 12,
                item: "Glove",
                issued_on: new Date(),
              },
            ]}
          />
˝      </div>
      <Modal
        drawerOpen={show}
        title="Add distribution"
        onClose={() => setShow(false)}
      >
        <AddDistribution />
      </Modal>
    </>
  );
};
export default Distributions;
