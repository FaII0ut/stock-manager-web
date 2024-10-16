import React, {useEffect, useState} from "react";
import TextInput from "../inputs/TextInput";
import ApiSearch from "../inputs/ApiSearch";
import DatePicker from "../inputs/DatePicker";
import {useInventoryManage} from "@/api/useInventory";
import moment from "moment";

interface AddInventoryProps {
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

const AddInventory: React.FC<AddInventoryProps> = ({
  changed = false,
  confirm = false,
  open = false,
  setLoading = () => {},
  setConfirm = () => {},
  onCreate = () => {},
  item = {},
}) => {
  const [details, setDetails] = useState<any>(item);
  const {createInventory, updateInventory} = useInventoryManage();

  const handleChange = (value: any, field: string) => {
    details[field] = value;
    setDetails({...details});
  };

  useEffect(() => {
    if (!confirm) return;
    handleSave();
    setConfirm(false);
  }, [confirm]);

  const handleSave = async () => {
    let response = {
      ...details,
    };
    setLoading(true);
    try {
      details.id
        ? (response = await updateInventory(details))
        : (response = await createInventory({
            ...details,
            sku: String(moment().unix()),
            status: true,
          }));
      if (response.status === 201 || response.status === 200) {
        console.log(response.data.data);
        onCreate(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="px-8 border-t b-50">
      <div className="flex flex-col w-full mt-8 gap-y-6">
        <TextInput
          title="Name"
          onChange={(v) => handleChange(v, "name")}
          value={details.name}
          width="w-full"
          placeholder="Enter Name"
        />
        <TextInput
          title="Description"
          onChange={(v) => handleChange(v, "description")}
          value={details.description}
          width="w-full"
          placeholder="Description"
        />
        {/* <TextInput
          title="Item Code"
          onChange={(v) => handleChange(v, "sku")}
          value={details.sku}
          width="w-full"
          placeholder="Sku code"
        /> */}
        <ApiSearch
          title="Category"
          url="categories"
          onChange={(v: any) => handleChange(v?.id, "category_id")}
          defaultSelected={details.category}
          width="w-full"
          placeholder="Write something here"
        />
        <TextInput
          title="Item code"
          onChange={(v) => handleChange(v, "code")}
          value={details.code}
          width="w-full"
          placeholder="Enter code"
        />
        <TextInput
          title="Price"
          onChange={(v) => handleChange(v, "price")}
          value={details.price}
          width="w-full"
          placeholder="Enter price"
        />
        <TextInput
          title="PAR"
          onChange={(v) => handleChange(v, "min_count")}
          value={details.min_count}
          width="w-full"
          placeholder="Enter min_count"
        />
        <TextInput
          title="Stock"
          onChange={(v) => handleChange(v, "stock")}
          value={details.stock}
          width="w-full"
          placeholder="Enter stock"
        />
      </div>
    </div>
  );
};
export default AddInventory;
