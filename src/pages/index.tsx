import BarChart from "@/components/charts/BarChart";
import LineChart from "@/components/charts/LineChart";
import ExportInventory from "@/components/forms/ExportInventory";
import Button from "@/components/global/Button";
import Modal from "@/components/global/Modal";
import Header from "@/components/layout/Header";
import React, {useState} from "react";

interface HomeProps {}

const Home: React.FC<HomeProps> = ({}) => {
  const [show, setShow] = useState(false);

  return (
    <div className="bg-white w-full h-full">
      <Header title="January 2023">
        <Button label="Export" onClick={() => setShow(true)} />
      </Header>
      <div className="grid grid-cols-12 gap-4 mx-4">
        <div className="w-full col-span-12 border border-zinc-200 p-6 rounded-xl">
          <p className="text-2xl font-semibold text-zinc-800">Current stock</p>
          <p className="text-sm text-zinc-400 w-4/5 mb-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
            reprehenderit, commodi corporis et aliquid quisquam id fugiat earum
            aperiam possimus cum pariatur? Doloremque
          </p>
          <div className="h-[280px] ">
            <BarChart total={100} />
          </div>
        </div>
        <div className="w-full col-span-12 border border-zinc-200 p-6 mb-4 rounded-xl">
          <p className="text-2xl font-semibold text-zinc-800">Distributions</p>
          <p className="text-sm text-zinc-400 w-4/5 mb-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
            reprehenderit, commodi corporis et aliquid quisquam id fugiat earum
            aperiam possimus cum pariatur? Doloremque
          </p>
          <div className="h-[280px] ">
            <LineChart total={100} />
          </div>
        </div>
      </div>
      <Modal
        drawerOpen={show}
        title="Add distribution"
        onClose={() => setShow(false)}
      >
        <ExportInventory
          onCreate={() => {
            setShow(false);
          }}
        />
      </Modal>
    </div>
  );
};
export default Home;
