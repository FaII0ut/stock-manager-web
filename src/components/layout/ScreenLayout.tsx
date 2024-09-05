import React from "react";
import SideBar from "./SideBar";
import { useStoreState } from "@/store/hooks";

interface ScreenLayoutProps {
  children: JSX.Element;
}

const ScreenLayout: React.FC<ScreenLayoutProps> = ({children}) => {
  // const user = useStoreState((state) => state.user.user);

  return (
    <div className="flex flex-row p-2 bg-zinc-100 gap-2 min-h-[100dvh] pl-[50px] md:pl-[336px]">
      <SideBar />
      <div className="bg-white w-full rounded-xl overflow-x-scroll border border-gray-100 z-10">
         <>{children}</>
      </div>
    </div>
  );
};
export default ScreenLayout;
