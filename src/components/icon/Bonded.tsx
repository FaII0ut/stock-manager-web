import * as React from "react";
import { SVGProps } from "react";
const BondedIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      stroke="#D97706"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.333}
      d="M8 5.333V8m0 2.667h.006M6.86 1.907l-5.647 9.426a1.333 1.333 0 0 0 1.14 2h11.293a1.333 1.333 0 0 0 1.14-2L9.14 1.907a1.333 1.333 0 0 0-2.28 0Z"
    />
  </svg>
);
export default BondedIcon;
