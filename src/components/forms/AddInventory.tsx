import React, {useState} from "react";
import TextInput from "../inputs/TextInput";
import ApiSearch from "../inputs/ApiSearch";
import DatePicker from "../inputs/DatePicker";

interface AddInventoryProps {
  changed?: boolean;
  confirm?: boolean;
  open?: boolean;
  setLoading?: (value: boolean) => void;
  setConfirm?: (value: boolean) => void;
  onSuccess?: (item: any) => void;
  type?: string;
  item?: any;
}

const AddInventory: React.FC<AddInventoryProps> = ({}) => {
  const [loading, setLoading] = useState<any>(false);
  const [details, setDetails] = useState<any>({name: ""});

  const handleChange = (value: any, field: string) => {
    details[field] = value;
    setDetails({...details});
  };

  const handleSave = async () => {
    let response = {
      ...details,
      icon: details.icon.id,
    };
    setLoading(true);
    try {
      details.id
        ? (response = await updateAddon({
            ...details,
            icon: details.icon.id,
          }))
        : (response = await createAddon({
            ...details,
            icon: details.icon.id,
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
          title="Item Code"
          onChange={(v) => handleChange(v, "code")}
          value={details.code}
          width="w-full"
          placeholder="Enter Name"
        />
        <TextInput
          title="Stock"
          onChange={(v) => handleChange(v, "stock")}
          value={details.stock}
          width="w-full"
          placeholder="Enter Name"
        />
      </div>
    </div>
  );
};
export default AddInventory;
