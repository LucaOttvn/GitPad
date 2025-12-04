"use client";
import "./style.scss";
import {usePathname} from "next/navigation";
import ToolBarBackButton from "./ToolBarBackButton";
import EditorToolBarButtons from "./EditorToolBarButtons";
import {PagesEnum} from "@/src/utils/enums";

/**
 * Bottom toolbar with multiple functions based on the current page.
 */
export default function ToolBar() {
  const pathName = usePathname();

  const sections = pathName.split("/").filter((x) => x);

  return (
    <div id="toolBar">
      <ToolBarBackButton sections={sections} />
      {sections[0] === PagesEnum.fileEditor && <EditorToolBarButtons sections={sections} />}
      {sections[0] === PagesEnum.fileExplorer && <EditorToolBarButtons sections={sections} />}
    </div>
  );
}
