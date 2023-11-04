import * as React from "react";
import type { SVGProps } from "react";
export const SvgChevronDown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 24 24"
    xmlSpace="preserve"
    enableBackground="new 0 0 24 24"
    width="1em"
    height="1em"
    {...props}
  >
    <g stroke="#0D0D0D" fill="#0D0D0D">
      <polyline
        vectorEffect="non-scaling-stroke"
        points="20.5,7.75 12,16.25 3.5,7.75  "
        fill="none"
        strokeLinecap="round"
      />
    </g>
  </svg>
);
