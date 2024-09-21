import * as React from "react";
import {SVGProps} from "react";
const CalendarIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      stroke="#A3A3A3"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M13.333 1.667V5M6.667 1.667V5M2.5 8.333h15m-13.333-5h11.666c.92 0 1.667.746 1.667 1.667v11.666c0 .921-.746 1.667-1.667 1.667H4.167c-.92 0-1.667-.746-1.667-1.666V5c0-.92.746-1.667 1.667-1.667Z"
    />
  </svg>
);
export default CalendarIcon;
