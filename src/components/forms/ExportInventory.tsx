import React, {useEffect, useState} from "react";
import TextInput from "../inputs/TextInput";
import ApiSearch from "../inputs/ApiSearch";
import DatePicker from "../inputs/DatePicker";
import {useInventoryManage} from "@/api/useInventory";
import axios from "@/api/axios";
import * as XLSX from "xlsx";

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

  const exportToExcel = (jsonData: any[], fileName: string) => {
    // Convert the JSON data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(jsonData);

    // Create a new workbook and add the worksheet to it
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Generate and download the Excel file
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
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
