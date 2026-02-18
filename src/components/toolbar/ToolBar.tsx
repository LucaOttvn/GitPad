"use client";
import {PagesEnum} from "@/src/utils/enums";
import Link from "next/link";
import {usePathname} from "next/navigation";
import Icon from "../Icon";
import EditorToolBarButtons from "./EditorToolBarButtons";
import ExplorerToolBarButtons from "./ExplorerToolBarButtons";
import "./toolbar.scss";
import ToolBarBackButton from "./ToolBarBackButton";

/**
 * Bottom toolbar with multiple functions based on the current page.
 */
export default function ToolBar() {
  const pathName = usePathname();

  const sections = pathName.split("/").filter((x) => x);

  // The toolbar doesn't have to be visible in the login page.
  if (pathName.includes(`/${PagesEnum.login}`)) return null;

  return (
    <div id="toolBar" className="relative w-full center">
      <nav>
        {sections[0] !== PagesEnum.settings && <ToolBarBackButton sections={sections} />}

        {sections[0] === PagesEnum.fileExplorer && <ExplorerToolBarButtons />}

        {sections[0] === PagesEnum.fileEditor && <EditorToolBarButtons sections={sections} />}
        {sections[0] === PagesEnum.settings && (
          <Link href="/" className="mainButton">
            {/* <Image alt="home" src='/icons/home.svg'width={25} height={25} loading="eager"/> */}
            <Icon src="/icons/home.svg" />
          </Link>
        )}
      </nav>
    </div>
  );
}
