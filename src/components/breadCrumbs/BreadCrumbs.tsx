"use client";
import "./breadCrumbs.scss";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {PagesEnum} from "../../utils/enums";

export default function BreadCrumbs() {
  const pathName = usePathname();
  const breadCrumbs = pathName.split("/").filter((x) => x);
  const filteredBreadCrumbs = breadCrumbs.splice(1, breadCrumbs.length - 1);

  if (filteredBreadCrumbs.length === 0) return null;

  // Breadcrumbs don't have to be visible in the login page.
  if (pathName.includes(`/${PagesEnum.login}`)) return null;

  return (
    <div className="breadCrumbs">
      <div className="scrollableContent">
        {filteredBreadCrumbs.map((breadCrumb, index) => {
          const href = `/${PagesEnum.fileExplorer}/${filteredBreadCrumbs.slice(0, index + 1).join("/")}`;
          return <Link key={breadCrumb + index} href={href} className="breadCrumb">{`/${breadCrumb}`}</Link>;
        })}
      </div>
    </div>
  );
}
