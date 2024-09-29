import React, {useEffect, useState} from "react";
import BurgerIcon from "../icon/Burger";
import DashboardIcon from "../icon/Dashboard";
import InventoryIcon from "../icon/Inventory";
import DistributionIcon from "../icon/Distributions";
import PeopleIcon from "../icon/People";
import {useRouter} from "next/router";
import useAuth from "@/hooks/useAuth";

const items = [
  {
    id: "dashboard",
    icon: <DashboardIcon />,
    name: "Dashboard",
    route: "/",
  },
  {
    id: "distributions",
    icon: <DistributionIcon />,
    name: "Distributions",
    route: "/distributions",
  },
  {
    id: "staffs",
    icon: <PeopleIcon />,
    name: "Staffs",
    route: "/staffs",
  },
  {
    id: "inventory",
    icon: <InventoryIcon />,
    name: "Inventory",
    route: "/inventory",
  },
];

const setting: any = {
  id: "users",
  icon: <InventoryIcon />,
  name: "Users",
  route: "/users",
};
interface SideBarProps {}

const SideBar: React.FC<SideBarProps> = ({}) => {
  const [active, setActive] = useState("dashboard");
  const router = useRouter();
  const {getUser, user} = useAuth();
  // alert(JSON.stringify(user));
  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    const page = router.asPath.split("/").slice(1, 2)[0];
    setActive(page ? page : "dashboard");
  }, [router]);

  return (
    <div className="w-[320px] fixed left-0 h-full  bg-zinc-100 rounded-xl p-2">
      <div className="flex flex-row items-center space-x-2 mb-3">
        <div className="p-2 rounded-lg cursor-pointer w-min">
          <BurgerIcon />
        </div>
        <p className="text-lg text-gray-800 font-semibold md:flex hidden">
          STOCK MANAGER
        </p>
      </div>
      <div className="flex flex-col gap-y-1">
        {[...items, ...(user?.name === "Admin" ? [setting] : [])].map(
          (item, index) => (
            <div
              onClick={() => router.push(item.route)}
              key={index}
              className={`hover:bg-zinc-300/50 group rounded-lg px-2 py-2 flex flex-row space-x-3 cursor-pointer ${
                item.id === active ? "bg-zinc-300/50" : ""
              }`}
            >
              {item.icon}
              <p className="text-zinc-800 group-hover:text-cyan-600">
                {item.name}
              </p>
            </div>
          )
        )}
      </div>
      <div className="w-full h-12 rounded-lg absolute bottom-2 left-2 flex flex-row space-x-2">
        <div className="w-10 h-10 rounded-full bg-cyan-200" />
        <div className="md:flex hidden flex-col">
          <p className="text-sm text-zinc-700">{user?.name}</p>
          <p className="text-xs text-zinc-500">{user?.email}</p>
        </div>
      </div>
      {/* <Input /> */}
    </div>
  );
};
export default SideBar;
