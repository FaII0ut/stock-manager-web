import * as React from "react";
import {SVGProps} from "react";
const PeopleIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M15.214 10.429a3.336 3.336 0 0 0 3.215-3.312A3.167 3.167 0 0 0 15.214 4M9.429 10.429a3.336 3.336 0 0 0 3.214-3.312A3.167 3.167 0 0 0 9.429 4a3.167 3.167 0 0 0-3.215 3.117 3.335 3.335 0 0 0 3.215 3.312v0ZM16 20v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M21 20v-3a3 3 0 0 0-3-3"
    />
  </svg>
);
export default PeopleIcon;
