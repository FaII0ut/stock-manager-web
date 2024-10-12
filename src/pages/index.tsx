import axios from "@/api/axios";
import BarChart from "@/components/charts/BarChart";
import LineChart from "@/components/charts/LineChart";
import ExportInventory from "@/components/forms/ExportInventory";
import Button from "@/components/global/Button";
import Modal from "@/components/global/Modal";
import Header from "@/components/layout/Header";
import React, {useEffect, useState} from "react";

interface HomeProps {}

const Home: React.FC<HomeProps> = ({}) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState<any>(false);

  const exportInventory = async () => {
    try {
      const response = await axios.get("/items/minimum-stock-stats");

      let labels: any = [];
      let par: any = [];
      let stock: any = [];
      response.data.map((x: any) => {
        labels = [...labels, x.name];
        par = [...par, x.min_count];
        stock = [...stock, x.stock];
      });
      const temp = [
        {
          label: "PAR",
          data: par,
          backgroundColor: "rgba(249, 119, 124, 1)",
          borderColor: "rgba(249, 119, 124, 1)",
          tension: 0.3,
          borderWidth: 2,
        },
        {
          label: "Stock amount",
          data: stock,
          backgroundColor: "rgba(63, 212, 206)",
          borderColor: "rgba(63, 212, 206)",
          tension: 0.3,
          borderWidth: 2,
        },
      ];
      setData({
        labels: labels,
        dataSets: temp,
      });
    } catch (error) {}
  };

  useEffect(() => {
    exportInventory();
  }, []);

  return (
    <div className="bg-white w-full h-full">
      <Header title="January 2023">
        <Button label="Export" onClick={() => setShow(true)} />
      </Header>
      <div className="grid grid-cols-12 gap-4 mx-4">
      <div className="w-full col-span-12 border border-zinc-200 p-6 mb-4 rounded-xl">
          <p className="text-2xl font-semibold text-zinc-800">PAR Level</p>
          <p className="text-sm text-zinc-400 w-4/5 mb-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
            reprehenderit, commodi corporis et aliquid quisquam id fugiat earum
            aperiam possimus cum pariatur? Doloremque
          </p>
          <div className="h-[580px] ">
            {data ? <LineChart data={data} /> : null}
          </div>
        </div>
        <div className="w-full col-span-12 border border-zinc-200 p-6 rounded-xl">
          <p className="text-2xl font-semibold text-zinc-800">Current stock</p>
          <p className="text-sm text-zinc-400 w-4/5 mb-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
            reprehenderit, commodi corporis et aliquid quisquam id fugiat earum
            aperiam possimus cum pariatur? Doloremque
          </p>
          <div className="h-[280px] ">
            {data ? <BarChart total={100} /> : null}
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
