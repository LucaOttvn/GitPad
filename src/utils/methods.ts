import { TypesEnum } from "./enums";
import { TreeItem } from "./models";

/**
 * Check if the input path respects all the requirements for a file/folder name
 * @param input 
 */
export function validatePath(input: string): string | null {
  const path = input.trim();

  if (!path) return "Path cannot be empty";
  if (path.startsWith("/")) return "Do not start with '/'";

  // only allowed chars
  if (!/^[A-Za-z0-9._\-\/]+$/.test(path)) {
    return "Use only letters, numbers, '-', '_', '.', and '/'";
  }

  if (path.includes("//")) return "Path cannot contain '//'";

  const segments = path.split("/");
  for (const seg of segments) {
    if (!seg) return "Each folder/file name must be non-empty";
    if (seg === "." || seg === "..") return "'.' and '..' are not allowed";
    if (seg.length > 100) return "Each segment must be <= 100 characters";
  }

  // Extension check: get last segment, check for .md or .txt
  const lastSegment = segments[segments.length - 1];
  const dotIndex = lastSegment.lastIndexOf(".");
  const hasExtension = dotIndex > 0 && dotIndex < lastSegment.length - 1;
  const ext = hasExtension ? lastSegment.slice(dotIndex).toLowerCase() : "";

  if (hasExtension && ext !== ".md" && ext !== ".txt") {
    return "File must be .md or .txt";
  }

  return null;
}


export function isTextFilePath(path: string): boolean {
  const trimmed = path.trim();
  if (!trimmed) return false;

  // Get last segment after /.
  const lastSegment = trimmed.split("/").pop()!;

  // Check whether the lastSegment contains an extension (.md or .txt).
  // If it does, it's a file, otherwise it's a folder.
  return /\.(md|txt)$/i.test(lastSegment);
}

/**
 * Build the folders tree starting from an array of paths.
 * @param paths 
 * @returns 
 */
export function buildTree(paths: string[]): TreeItem[] {
  const tree: TreeItem[] = [];

  function insertPath(currentLevel: TreeItem[], pathSections: string[], parentPath: string): void {
    if (pathSections.length === 0) return;

    // Separate the first section of the path from the rest
    const [head, ...rest] = pathSections;

    // Concat the full path for this node
    // If parentPath is empty, it's just "head", otherwise "parent/head"
    const currentFullPath = parentPath ? `${parentPath}/${head}` : head;

    // Look in the current tree level for the head of the path
    // If it's not found, create a new one and add it to the parent
    let node: TreeItem | undefined = currentLevel.find((item) => item.name === head);

    if (!node) {
      // Differentiate files from folders
      const isFile = head.includes(".") && head[0] !== ".";

      node = {
        name: head,
        path: currentFullPath || '',
        type: isFile ? TypesEnum.blob : TypesEnum.tree,
        children: [],
      };
      currentLevel.push(node);
    }

    insertPath(node.children, rest, currentFullPath);
  };

  // For each path, spllit by sections and pass it to insertPath()
  for (const path of paths) {
    const sections = path.split("/").filter((s) => s);
    insertPath(tree, sections, "");
  }

  return tree;
};

/**
 * Look for a specific folder/file through the folders tree.
 * @param tree 
 * @param targetPath 
 * @returns 
 */
export function findByPath(tree: TreeItem[], targetPath: string): TreeItem | null {
  for (const node of tree) {
    if (node.path === targetPath) return node;

    if (node.type === TypesEnum.tree && node.children.length > 0) {
      const found = findByPath(node.children, targetPath);
      if (found) return found;
    }
  }
  return null;
};


/////////////////////


/**
 * 
 * /test1/a.md
 * /test1/b.md
 * /test1/c.md
 * /test2/test2.1/a.md
 * /test2/test2.1/b.md
 * /test2/test2.1/b.md
 * /test2/test2.2/a.md
 * /test2/test2.2/b.md
 * 
 */

// export function testTree() {
//   const paths = [
//     '/test1',
//     '/test1/a.md',
//     '/test1/b.md',
//     '/test1/c.md',
//     '/test2',
//     '/test2/test2.1',
//     '/test2/test2.2',
//     '/test2/test2.1/a.md',
//     '/test2/test2.1/b.md',
//     '/test2/test2.1/b.md',
//     '/test2/test2.2/a.md',
//     '/test2/test2.2/b.md',
//     'a.md',
//     'b.md'
//   ]
  
//   const tree: Record<string, string> = {}

//   const currentLevel = 0

//   for (const path of paths) {
//     const sections = path.split('/').filter(x => x)

//     const itemAtCurrentLevel = path[currentLevel]
//     tree[itemAtCurrentLevel] = tree[itemAtCurrentLevel] ? 

//     // const tree: TreeItem = {
//     //   name: 'ROOT',
//     //   path: '/',
//     //   children: [],
//     //   type: TypesEnum.tree
//     // }

//     for (const [index, section] of sections.entries()) {
//       console.log(section)
//     }
//   }
// }

// testTree()