import React, {useEffect, useState} from "react";
import TextInput from "../inputs/TextInput";
import ApiSearch from "../inputs/ApiSearch";
import DatePicker from "../inputs/DatePicker";
import {useInventoryManage} from "@/api/useInventory";
import axios from "@/api/axios";
import { exportToExcel } from "@/helper/exportHelper";

interface ExportInventoryProps {
  changed?: boolean;
  confirm?: boolean;
  open?: boolean;
  setLoading?: (value: boolean) => void;
  setConfirm?: (value: boolean) => void;
  onSuccess?: (item: any) => void;
  type?: string;
  item?: any;
  onCreate?: (item: any) => void;
}

const ExportInventory: React.FC<ExportInventoryProps> = ({
  changed = false,
  confirm = false,
  open = false,
  setLoading = () => {},
  setConfirm = () => {},
  onCreate = () => {},
  item = {},
}) => {
  const [details, setDetails] = useState<any>(item);

  const handleChange = (value: any, field: string) => {
    details[field] = value;
    setDetails({...details});
  };

  useEffect(() => {
    if (!confirm) return;
    console.log("fire");

    handleSave();
    setConfirm(false);
  }, [confirm]);

  const handleSave = async () => {
    try {
      console.log("vall");
      const response = await axios.get("dispatches/export/json", {
        params: details,
      });
      exportToExcel(response.data.dispatches,'file');
    } catch (error) {}
    setLoading(false);
  };

  

  return (
    <div className="px-8 border-t b-50">
      <div className="flex flex-col w-full mt-8 gap-y-6">
        <TextInput
          title="Month"
          onChange={(v) => handleChange(v, "month")}
          value={details.month}
          width="w-full"
          placeholder="Enter Month"
        />
        <TextInput
          title="Year"
          onChange={(v) => handleChange(v, "year")}
          value={details.year}
          width="w-full"
          placeholder="Enter Year"
        />
      </div>
    </div>
  );
};
export default ExportInventory;
