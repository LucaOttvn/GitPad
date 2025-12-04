"use client";

import {pushFile} from "@/src/server-actions/push-file";
import {itemsToPush} from "@/src/utils/signals";
import Link from "next/link";
import {usePathname} from "next/navigation";
import toast from "react-hot-toast";

interface EditorToolBarButtonsProps {
  sections: string[];
}

export default function EditorToolBarButtons(props: EditorToolBarButtonsProps) {
  const pathName = usePathname();

  const editorHref = `/${props.sections.slice(0, -1).join("/")}`;

  const filePath = props.sections.slice(1, props.sections.length).join("/");

  const handlePush = async () => {
    const fileContent = itemsToPush.value.find((item) => item.path === filePath);
    if (!fileContent) return;
    const result = await pushFile(filePath, fileContent.content);
    if (result.status == "ok") return toast.success("File pushed!");
    toast.error("Push failed");
  };

  const isPreviewMode = props.sections[props.sections.length - 1] === 'preview';

  return (
    <>
      {isPreviewMode ? (
        <Link href={`${editorHref}`} className="mainButton clickableItem">
          <span>Editor</span>
        </Link>
      ) : (
        <Link href={`${pathName}/preview`} className="mainButton clickableItem">
          <span>Preview</span>
        </Link>
      )}

      <button className="mainButton clickableItem" onClick={handlePush}>
        <span>Push</span>
      </button>
    </>
  );
}
