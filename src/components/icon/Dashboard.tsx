import * as React from "react";
import {SVGProps} from "react";
const DashboardIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
    className="stroke-zinc-700 group-hover:stroke-cyan-600"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M18.5 3H16a2.5 2.5 0 0 0-2.5 2.5V8a2.5 2.5 0 0 0 2.5 2.5h2.5A2.5 2.5 0 0 0 21 8V5.5A2.5 2.5 0 0 0 18.5 3ZM18.5 13.5H16a2.5 2.5 0 0 0-2.5 2.5v2.5A2.5 2.5 0 0 0 16 21h2.5a2.5 2.5 0 0 0 2.5-2.5V16a2.5 2.5 0 0 0-2.5-2.5ZM8 3H5.5A2.5 2.5 0 0 0 3 5.5V8a2.5 2.5 0 0 0 2.5 2.5H8A2.5 2.5 0 0 0 10.5 8V5.5A2.5 2.5 0 0 0 8 3ZM8 13.5H5.5A2.5 2.5 0 0 0 3 16v2.5A2.5 2.5 0 0 0 5.5 21H8a2.5 2.5 0 0 0 2.5-2.5V16A2.5 2.5 0 0 0 8 13.5Z"
    />
  </svg>
);
export default DashboardIcon;
