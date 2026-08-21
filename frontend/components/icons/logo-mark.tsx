import { SVGProps } from "react";

export function LogoMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="9" cy="12" r="6" fill="currentColor" fillOpacity="0.9" />
      <circle cx="15" cy="12" r="6" fill="currentColor" fillOpacity="0.55" />
    </svg>
  );
}
