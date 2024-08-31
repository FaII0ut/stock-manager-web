import * as React from "react";
import {SVGProps} from "react";
const DistributionIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="m10 12-3.854 5.803M9 3h6v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V3ZM3 15.108v4.168A1.724 1.724 0 0 0 4.724 21h5.15"
    />
    <path
      className="stroke-zinc-700 group-hover:stroke-cyan-600"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3 6V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-2.409"
    />
    <path
      className="stroke-zinc-700 group-hover:stroke-cyan-600"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m3 15.108 7.198 6.17A3 3 0 0 0 12.15 22h3.29a1.15 1.15 0 0 0 .859-1.914L14 17.5v-1h2.063a1.437 1.437 0 0 0 .362-2.828L10 12 3 6"
    />
  </svg>
);
export default DistributionIcon;
