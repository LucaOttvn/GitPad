"use client";
import "./breadCrumbs.scss";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {PagesEnum} from "../../utils/enums";
import {useEffect, useRef} from "react";

export default function BreadCrumbs() {
  const pathName = usePathname();
  const breadCrumbs = pathName.split("/").filter((x) => x);
  const filteredBreadCrumbs = breadCrumbs.splice(1, breadCrumbs.length - 1);

  const scrollableRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollableRef.current?.scrollTo({
      left: scrollableRef.current.scrollWidth,
      behavior: "smooth",
    });
  }, [pathName]);

  if (filteredBreadCrumbs.length === 0) return null;

  // Breadcrumbs don't have to be visible in the login page.
  if (pathName.includes(`/${PagesEnum.login}`) || pathName.includes(`/${PagesEnum.fileEditor}`)) return null;

  return (
    <div className="breadCrumbs">
      <div className="scrollableContent" ref={scrollableRef}>
        {filteredBreadCrumbs.map((breadCrumb, index) => {
          const href = `/${PagesEnum.fileExplorer}/${filteredBreadCrumbs.slice(0, index + 1).join("/")}`;
          return <Link key={breadCrumb + index} href={href} className="breadCrumb">{`/${breadCrumb}`}</Link>;
        })}
      </div>
    </div>
  );
}
