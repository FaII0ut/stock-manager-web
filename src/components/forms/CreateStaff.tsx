import React, {useEffect, useState} from "react";
import TextInput from "../inputs/TextInput";
import ApiSearch from "../inputs/ApiSearch";
import DatePicker from "../inputs/DatePicker";
import {useStaffsManage} from "@/api/useStaffs";

interface CreateStaffProps {
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

const CreateStaff: React.FC<CreateStaffProps> = ({
  confirm = false,
  setLoading = () => {},
  setConfirm = () => {},
  onCreate = () => {},
}) => {
  const [details, setDetails] = useState<any>({name: ""});
  const {createStaffs, updateStaffs} = useStaffsManage();

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
        ? (response = await updateStaffs(details))
        : (response = await createStaffs(details));
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
