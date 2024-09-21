import * as React from "react";
import {SVGProps} from "react";
const ChevDown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      stroke="#A3A3A3"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m4 6 4 4 4-4"
    />
  </svg>
);
export default ChevDown;
