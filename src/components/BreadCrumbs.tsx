"use client";
import {usePathname} from "next/navigation";
import "./shared-styles.scss";
import ShadowScroller from "./ShadowScroller";

export default function BreadCrumbs() {
  const pathname = usePathname();

  const breadCrumbs = pathname.split("/").filter((x) => x);

  if (breadCrumbs.length === 0) return null;

  return (
    <div className="breadCrumbs">
      <ShadowScroller top={0} right={0} width="8%" height="100%" deg="90"/>
      <div className='scrollableContent'>
        {breadCrumbs.map((breadCrumb, index) => (
          <span key={breadCrumb + index} className="breadCrumb">{`/ ${breadCrumb}`}</span>
        ))}
      </div>
      <ShadowScroller top={0} left={0} width="8%" height="100%" deg="-90"/>
    </div>
  );
}
