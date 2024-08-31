import * as React from "react";
import {SVGProps} from "react";
const BurgerIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      stroke="#141414"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 10H3m18-4H3m18 8H3m18 4H3"
    />
  </svg>
);
export default BurgerIcon;
