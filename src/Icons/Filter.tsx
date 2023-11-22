import * as React from "react";
import type { SVGProps } from "react";
export const SvgFilter = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 24 24"
    vectorEffect="non-scaling-stroke"
    xmlSpace="preserve"
    enableBackground="new 0 0 24 24"
    width="1em"
    height="1em"
    {...props}
  >
    <g stroke="#0D0D0D" fill="#0D0D0D">
      <polygon
        vectorEffect="non-scaling-stroke"
        points="13.5,10.5 13.5,18.5 10.5,21.5 10.5,10.5 2.5,2.5 21.5,2.5  "
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);
