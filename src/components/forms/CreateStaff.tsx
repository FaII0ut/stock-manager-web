import React, {useState} from "react";
import TextInput from "../inputs/TextInput";
import ApiSearch from "../inputs/ApiSearch";
import DatePicker from "../inputs/DatePicker";

interface CreateStaffProps {}

const CreateStaff: React.FC<CreateStaffProps> = ({}) => {
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
          title="Staff Code"
          onChange={(v) => handleChange(v, "code")}
          value={details.code}
          width="w-full"
          placeholder="Enter Name"
        />
        <TextInput
          title="Nid"
          onChange={(v) => handleChange(v, "nid")}
          value={details.nid}
          width="w-full"
          placeholder="Enter Name"
        />
        <TextInput
          title="Designation"
          onChange={(v) => handleChange(v, "designation")}
          value={details.designation}
          width="w-full"
          placeholder="Enter Name"
        />
      </div>
    </div>
  );
};
export default CreateStaff;
