import type { FC } from "react";
import type { Props } from "./types";

const Unstarted: FC<Props> = ({ color, width, height }) => (
  <svg
    width={width || "14"}
    height={height || "14"}
    viewBox="0 0 14 14"
    fill="none"
    aria-label="Todo"
    className="color-override sc-csNZvx hgnvPG"
  >
    <rect x="1" y="1" width={width || "12"} height={height || "12"} rx="6" stroke={color || "#95999f"} strokeWidth="2" fill="none"/>
    <path fill={color || "#95999f"} stroke="none" d="M 3.5,3.5 L3.5,0 A3.5,3.5 0 0,1 3.5, 0 z" transform="translate(3.5,3.5)"/>
  </svg>
);

export { Unstarted };
