import AddInventory from "@/components/forms/AddInventory";
import CreateStaff from "@/components/forms/CreateStaff";
import Button from "@/components/global/Button";
import Modal from "@/components/global/Modal";
import Header from "@/components/layout/Header";
import Listing from "@/components/listings/Listing";
import React, {useState} from "react";

interface InventoryProps {}

const fields = [
  {
    display: "Item",
    field: "name",
    element: (value: string, {name, identifier}: any) => (
      <div className="px-8 py-4 flex flex-col">
        <p className="text-zinc-900 text-sm font-medium">{value}</p>
        <p className="text-zinc-500 text-xs font-medium">{identifier}</p>
      </div>
    ),
  },
  {
    display: "Stock",
    field: "stock",
    textClass: "text-sm text-zinc-500",
  },
];
const Inventory: React.FC<InventoryProps> = ({}) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="bg-white w-full  h-full ">
        <Header hideCrumbs={true} title="Invetory">
          <Button label="Add new" onClick={() => setShow(true)} />
        </Header>
        <Listing
          fields={fields}
          data={[
            {
              name: "Glove",
              identifier: "SKS0012",
              stock: 12,
            },
          ]}
        />
      </div>
      <Modal
        drawerOpen={show}
        title="Add Item"
        onClose={() => setShow(false)}
      >
        <AddInventory />
      </Modal>
    </>
  );
};
export default Inventory;
