import React, {useState} from "react";
import TextInput from "../inputs/TextInput";
import ApiSearch from "../inputs/ApiSearch";
import DatePicker from "../inputs/DatePicker";

interface AddInventoryProps {}

const AddInventory: React.FC<AddInventoryProps> = ({}) => {
  const [details, setDetails] = useState<any>({name: ""});

  const handleChange = (value: any, field: string) => {
    details[field] = value;
    setDetails({...details});
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
