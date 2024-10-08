import React, {useEffect, useState} from "react";
import TextInput from "../inputs/TextInput";
import ApiSearch from "../inputs/ApiSearch";
import DatePicker from "../inputs/DatePicker";
import {useDistributionManage} from "@/api/useDistributions";
import moment from "moment";
import {Combobox} from "@headlessui/react";

interface AddDistributionProps {
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

const AddDistribution: React.FC<AddDistributionProps> = ({
  changed = false,
  confirm = false,
  open = false,
  setLoading = () => {},
  setConfirm = () => {},
  onCreate = () => {},
  item = {},
}) => {
  const [details, setDetails] = useState<any>(item);
  const {createDistribution, updateDistribution} = useDistributionManage();

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
        ? (response = await updateDistribution(details))
        : (response = await createDistribution(details));
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
        <ApiSearch
          title="Staff"
          url="staff"
          onChange={(v: any) => handleChange(v?.id, "staff_id")}
          defaultSelected={details.staff}
          renderElement={(item, selected) => {
            return (
              <Combobox.Option
                key={item.id}
                value={item}
                className={({active}) =>
                  `flex item-center px-4 outline-none py-2 rounded cursor-pointer gap-2 ${
                    active ? "bg-zinc-100" : ""
                  } ${selected?.id == item.id ? "bg-zinc-100" : ""}`
                }
              >
                <div className="flex flex-col">
                  <p className="text-sm text-zinc-900">{item.name}</p>
                  <p className="text-xs text-zinc-500">
                    {item.nid} - {item.staff_code}
                  </p>
                </div>
                {selected?.id == item.id ? (
                  <div className="flex ml-auto items-center">X</div>
                ) : null}
              </Combobox.Option>
            );
          }}
          width="w-full"
          placeholder="Write something here"
        />
        <ApiSearch
          title="Item"
          url="items"
          onChange={(v: any) => handleChange(v?.id, "item_id")}
          defaultSelected={details.item}
          width="w-full"
          placeholder="Write something here"
        />
        <TextInput
          title="Quantity"
          onChange={(v) => handleChange(v, "quantity")}
          value={details.quantity}
          width="w-full"
          placeholder="Enter Name"
        />
        <DatePicker
          title="Transaction Date"
          width="w-full"
          displayFormat="MMM, DD YYYY HH:mm:ss"
          outputFormat="YYYY-MM-DD HH:mm:ss"
          onChange={(v) => handleChange(v, "date")}
          value={
            details.date ? details.date : moment().format("YYYY-MM-DD HH:mm:ss")
          }
        />
        {/* <Input
          title="Benefit"
          type="ApiSearch"
          url="benefits"
          onChange={(v: any) => handleFormValueChange("benefit_id", v?.id)}
          defaultSelected={formValues.benefit}
          width="w-full"
          placeholder="Write something here"
        /> */}
        {/* <div className="flex flex-col space-y-3">
            <ContactNumber
              placeholder="Country"
              title={"Contact"}
              handleChange={(val, field) => handleContact(val, field)}
              contact_number={details.contact}
              contact_country={details.country}
            />
          </div> */}
      </div>
    </div>
  );
};
export default AddDistribution;
