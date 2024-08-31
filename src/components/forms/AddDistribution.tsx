import React, {useState} from "react";
import TextInput from "../inputs/TextInput";
import ApiSearch from "../inputs/ApiSearch";
import DatePicker from "../inputs/DatePicker";

interface AddDistributionProps {}

const AddDistribution: React.FC<AddDistributionProps> = ({}) => {
  const [details, setDetails] = useState<any>({name: ""});

  const handleChange = (value: any, field: string) => {
    details[field] = value;
    setDetails({...details});
  };

  return (
    <div className="px-8 border-t b-50">
      <div className="flex flex-col w-full mt-8 gap-y-6">
        <ApiSearch
          title="Staff"
          url="benefits"
          onChange={(v: any) => handleChange(v?.id, "benefit_id")}
          defaultSelected={details.benefit}
          width="w-full"
          placeholder="Write something here"
        />
        <ApiSearch
          title="Item"
          url="benefits"
          onChange={(v: any) => handleChange(v?.id, "item_id")}
          defaultSelected={details.benefit}
          width="w-full"
          placeholder="Write something here"
        />
        <TextInput
          title="Quantity"
          onChange={(v) => handleChange(v, "qty")}
          value={details.name}
          width="w-full"
          placeholder="Enter Name"
        />
        <DatePicker
          title="Transaction Date"
          width="w-full"
          onChange={(v) => handleChange(v, "date")}
          value={details.date}
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
