import * as React from "react";
import {SVGProps} from "react";
const EditIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={34}
    height={34}
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        stroke={props.stroke ? props.stroke : "#525252"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.667}
        d="M21.166 9.5a2.357 2.357 0 0 1 3.334 3.333l-11.25 11.25-4.584 1.25 1.25-4.583L21.166 9.5Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M7 7h20v20H7z" />
      </clipPath>
    </defs>
  </svg>
);
export default EditIcon;
