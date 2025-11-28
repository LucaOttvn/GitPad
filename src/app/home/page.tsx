import getRepoContents from "@/src/server-actions/get-repo";
import {TypesEnum} from "@/src/utils/enums";
import {buildTree} from "path-mapper-json";

interface HomeProps {}

interface TreeItem {
  name: string;
  type: TypesEnum;
  children: TreeItem[];
}

export default async function Home(props: HomeProps) {
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

  // const paths = contents.map((folder: {path: string}) => folder.path);
  const paths = ["Coding", "Coding/JS", "Coding/JS/Enum.ts", "Coding/JS/ForLoop.md", "Coding/TS", "Security", "Security/Easy/Example1.ts", "Security/Medium"];

  const tree = buildTree(paths);
  console.log(tree);

  return (
    <div>
      {/* <div>
        {folders.map((folder: {name: string; path: string; type: string}) => (
          <div key={folder.path}>{folder.path.split("/")[folder.path.split("/").length - 1]}</div>
        ))}
      </div> */}
    </div>
  );
}
