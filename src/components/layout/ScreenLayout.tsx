import React, {useEffect} from "react";
import SideBar from "./SideBar";
import {useStoreState} from "@/store/hooks";
import useAuth from "@/hooks/useAuth";

interface ScreenLayoutProps {
  children: JSX.Element;
}

const ScreenLayout: React.FC<ScreenLayoutProps> = ({children}) => {
  const {getUser, user} = useAuth();
  // alert(JSON.stringify(user));
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="flex flex-row p-2 bg-zinc-100 gap-2 min-h-[100dvh] pl-[50px] md:pl-[336px]">
      {user ? (
        <>
          <SideBar />
          <div className="bg-white w-full rounded-xl overflow-x-scroll border border-gray-100 z-10">
            <>{children}</>
          </div>
        </>
      ) : null}
    </div>
  );
};
export default ScreenLayout;
