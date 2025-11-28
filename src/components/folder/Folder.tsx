import { TreeItem } from "@/src/utils/models";
import "./style.scss";
import Link from "next/link";

interface FolderProps {
  folder: TreeItem;
}
export default async function Folder(props: FolderProps) {
 
  return (
    <Link href={`/file-explorer/${props.folder.name}`} className="folder">
      {props.folder.name}
    </Link>
  );
}
