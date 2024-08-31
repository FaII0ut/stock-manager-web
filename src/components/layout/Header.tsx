import React from "react";
import {useRouter} from "next/router";

interface HeaderProps {
  children?: JSX.Element;
  title: string;
  subtitle?: JSX.Element;
  extraClasses?: string;
  backBtn?: JSX.Element;
  icon?: string;
  hideSearch?: boolean;
  iconStroke?: string;
  extraElement?: JSX.Element;
  crumbs?: any[];
  hideCrumbs?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  children,
  title,
  subtitle,
  backBtn,
  extraClasses = "bg-25",
  icon = "sidebar/RedboxLogo",
  iconStroke,
  hideSearch = true,
  crumbs,
  extraElement = <></>,
  hideCrumbs = false,
}) => {
  const router = useRouter();
  return (
    <div
      className={`flex p-6 bg-25 justify-between z-10 duration-300 ease-in-out transition-all ${extraClasses}`}
    >
      {/* sticky top-0 */}
      <div className="flex items-center gap-3">
        {backBtn}
        <div className="flex flex-col">
          <div className="flex flex-row space-x-3 items-center">
            <div>
              <p className="md:text-xl text-base font-semibold text-900 capitalize cursor-pointer">
                {title}
              </p>
              {subtitle}
            </div>
            {extraElement}
          </div>
        </div>
      </div>
      <div>
        <div className="flex space-x-3">
          {children}
        </div>
      </div>
    </div>
  );
};
export default Header;
