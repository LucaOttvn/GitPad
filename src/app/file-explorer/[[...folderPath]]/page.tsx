import { TreeItem } from "@/src/utils/models";
import { buildTree, findByPath } from "path-mapper-json";
import "../fileExplorer.scss";
import getRepoContents from "@/src/server-actions/get-repo";
import FileExplorerList from "@/src/components/fileExplorer/FileExplorerList";

interface FolderPageProps {
  params: Promise<{folderPath: string[]}>;
}

export default async function FolderPage(props: FolderPageProps) {
  const response = await getRepoContents();

  // Extract the paths from each file in the tree.
  const paths = response.tree.map((item: any) => item.path);

  const tree: TreeItem[] = buildTree(paths);

  // When folderPath is undefined, you're in the /root of the tree.
  const {folderPath} = await props.params;

  let foundFolder;

  if (folderPath) foundFolder = findByPath(tree, folderPath.join("/"));

  if (folderPath && !foundFolder) {
    return (
      <div className="w-full h-full center">
        <span>Empty folder</span>
      </div>
    );
  }

  // If folderPath is undefined, cycle through the whole tree to get the root files and folders, otherwise cycle through the current folder's children.
  const items = !folderPath ? tree : foundFolder!.children;

  // Sort alphabetically
  items.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="fileExplorer">
      <FileExplorerList items={items}/>
    </div>
  );
}
