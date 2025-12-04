"use client";
import "./style.scss";
import {usePathname} from "next/navigation";
import ToolBarBackButton from "./ToolBarBackButton";
import EditorToolBarButtons from "./EditorToolBarButtons";

/**
 * Bottom toolbar with multiple functions based on the current page.
 */
export default function ToolBar() {
  const pathName = usePathname();

  const sections = pathName.split("/").filter((x) => x);

  return (
    <div id="toolBar">
      <ToolBarBackButton sections={sections} />
      {sections[0] === "file-editor" && <EditorToolBarButtons sections={sections} />}
    </div>
  );
}
