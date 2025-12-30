"use client";
import {TreeItem} from "@/src/utils/models";
import Link from "next/link";
import {usePathname} from "next/navigation";
import AnimatedDiv from "../animated/AnimatedDiv";
import {useSignals} from "@preact/signals-react/runtime";
import {selectedFiles} from "@/src/utils/signals";

interface FolderComponentProps {
  folder: TreeItem;
  index?: number;
}
export default function FolderComponent(props: FolderComponentProps) {
  useSignals();

  const pathname = usePathname();

  // Handle the root edge case to avoid "//folder"
  const parentPath = pathname === "/" ? "" : pathname;
  const href = `${parentPath}/${props.folder.name}`;
  return (
    <AnimatedDiv delay={props.index != undefined ? 0.07 * props.index : 0} className="w-full">
      <Link
        href={href}
        className={`treeItem ${selectedFiles.value ? "disabledItem" : "clickableItem"}`}
        onClick={(e) => {
          if (!selectedFiles.value) return;
          // Avoid redirecting if edit mode is on.
          e.preventDefault();
        }}
      >
        <span>
          <span style={{color: "var(--blue)"}}>/</span>
          {props.folder.name}
        </span>
      </Link>
    </AnimatedDiv>
  );
}
