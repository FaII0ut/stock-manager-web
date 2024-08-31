import CreateStaff from "@/components/forms/CreateStaff";
import Button from "@/components/global/Button";
import Modal from "@/components/global/Modal";
import Header from "@/components/layout/Header";
import Listing from "@/components/listings/Listing";
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
    display: "Designation",
    field: "designation",
    textClass: "text-sm text-zinc-500",
  },
  {
    display: "Sid",
    field: "sid",
    textClass: "text-sm text-zinc-500 lowercase",
  },
];

const Staffs: React.FC<StaffsProps> = ({}) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="bg-white w-full  h-full ">
        <Header hideCrumbs={true} title="Staffs">
          <Button label="Add new" onClick={() => setShow(true)} />
        </Header>
        <Listing
          fields={fields}
          data={[
            {
              name: "Ali",
              identifier: "A221122",
              sid: 12,
              designation: "Glove",
            },
          ]}
        />
      </div>
      <Modal
        drawerOpen={show}
        title="Create Staff"
        onClose={() => setShow(false)}
      >
        <CreateStaff />
      </Modal>
    </>
  );
};
export default Staffs;
