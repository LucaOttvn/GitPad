"use client";
import Image from "next/image";
import "./shared-styles.scss";
import {usePathname, useRouter} from "next/navigation";
import Link from "next/link";

export default function ToolBar() {
  const router = useRouter();
  const pathName = usePathname();

  const sections = pathName.split("/").filter((x) => x);

  const href = `/${sections.slice(0, sections.length - 1).join("/")}`;

  let isBackDisabled = sections.length === 0 ? " disabledLink" : " clickableItem";

  return (
    <div id="toolBar">
      {sections[0] !== "file-editor" ? (
        <Link href={href} className={"mainButton" + isBackDisabled}>
          <Image src="/icons/arrow-left.svg" alt="back" width={20} height={20} />
        </Link>
      ) : (
        <button
          className={"mainButton" + isBackDisabled}
          disabled={pathName === "/"}
          onClick={() => {
            router.back();
          }}
        >
          <Image src="/icons/arrow-left.svg" alt="back" width={20} height={20} />
        </button>
      )}
    </div>
  );
}
