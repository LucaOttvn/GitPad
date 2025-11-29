import FileComponent from "@/src/components/FileComponent";
import FolderComponent from "@/src/components/FolderComponent";
import getRepoContents from "@/src/server-actions/get-repo";
import {TypesEnum} from "@/src/utils/enums";
import {TreeItem} from "@/src/utils/models";
import {buildTree, findByPath} from "path-mapper-json";

interface FolderPageProps {
  params: Promise<{folderPath: string[]}>;
}

export default async function FolderPage(props: FolderPageProps) {
  const {folderPath} = await props.params;

  const response = await getRepoContents();

  const contents = response.tree.map((item: any) => {
    const sections = item.path.split("/");
    const name = sections[sections.length];
    return {
      name: name,
      type: item.type,
      path: item.path,
      children: [],
    };
  });

  const paths = contents.map((item: TreeItem) => item.path);

  const tree: TreeItem[] = buildTree(paths);
  console.log(tree);

  let foundFolder;

  if (folderPath) foundFolder = findByPath(tree, folderPath.join("/"));

  if (folderPath && !foundFolder) return <span>No folders</span>;

  return (
    <div className="fileExplorer">
      {!folderPath &&
        tree.map((item) => {
          if (item.type === TypesEnum.tree) return <FolderComponent key={item.path} folder={item} />;
          return <FileComponent file={item} />;
        })}
      {folderPath &&
        foundFolder &&
        foundFolder.children.map((item, index) => {
          if (item.type === TypesEnum.tree) return <FolderComponent key={item.path} folder={item} index={index} />;
          return <FileComponent key={item.path} file={item} index={index} />;
        })}
    </div>
  );
}
