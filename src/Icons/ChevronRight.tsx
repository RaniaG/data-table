import * as React from "react";
import type { SVGProps } from "react";
export const SvgChevronRight = (props: SVGProps<SVGSVGElement>) => (
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
        points="7.75,3.5 16.25,12 7.75,20.5  "
        fill="none"
        strokeLinecap="round"
      />
    </g>
  </svg>
);