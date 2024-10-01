import React, {useEffect, useState} from "react";
import TextInput from "../inputs/TextInput";
import ApiSearch from "../inputs/ApiSearch";
import DatePicker from "../inputs/DatePicker";
import {useUsersManage} from "@/api/useUsers";

interface CreateUserProps {
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

const CreateUser: React.FC<CreateUserProps> = ({
  confirm = false,
  setLoading = () => {},
  setConfirm = () => {},
  onCreate = () => {},
  item = {},
}) => {
  const [details, setDetails] = useState<any>(item);
  const {createUsers, updateUsers} = useUsersManage();

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
        ? (response = await updateUsers(details))
        : (response = await createUsers(details));
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
          title="Email"
          onChange={(v) => handleChange(v, "email")}
          value={details.email}
          width="w-full"
          placeholder="Enter Name"
        />
        <TextInput
          title="Password"
          onChange={(v) => handleChange(v, "password")}
          value={details.password}
          width="w-full"
          placeholder="Enter Name"
        />
        <TextInput
          title="C Password"
          onChange={(v) => handleChange(v, "password_confirmation")}
          value={details.password_confirmation}
          width="w-full"
          placeholder="Enter Name"
        />
      </div>
    </div>
  );
};
export default CreateUser;
