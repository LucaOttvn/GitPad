"use client";
import {usePathname, useRouter} from "next/navigation";
import "./shared-styles.scss";
import ShadowScroller from "./ShadowScroller";
import Link from "next/link";

export default function BreadCrumbs() {
  const pathname = usePathname();
  const breadCrumbs = pathname.split("/").filter((x) => x);

  if (breadCrumbs.length === 0) return null;

  return (
    <div className="breadCrumbs">
      <ShadowScroller top={0} right={0} width="8%" height="100%" deg="90" />
      <div className="scrollableContent">
        {breadCrumbs.map((breadCrumb, index) => {
          const href = `/${breadCrumbs.slice(0, index + 1).join("/")}`;
          return <Link key={breadCrumb + index} href={href} className="breadCrumb">{`/ ${breadCrumb}`}</Link>;
        })}
      </div>
      <ShadowScroller top={0} left={0} width="8%" height="100%" deg="-90" />
    </div>
  );
}
