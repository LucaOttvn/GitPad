// recursively look into the tree for the section to check
  const getParent = (sections: string[], sectionToCheck: string, target: string, parentItem: Map<string, TreeItem>) => {
    console.log('///////////');
    const foundParentItem = parentItem.get(sectionToCheck)?.children;

    console.log(parentItem);

    if (!foundParentItem) return;

    if (sectionToCheck === target) return foundParentItem;
    const nextSectionToCheckIndex = sections.indexOf(sectionToCheck);
    getParent(sections, sections[nextSectionToCheckIndex], target, foundParentItem);
  };

  for (const [pathIndex, path] of paths.entries()) {
    const sections = path.split("/");

    for (const [sectionIndex, section] of sections.entries()) {
      const foundItem = tree.get(section);

      if (foundItem) continue;

      // Handle the first element
      if (sectionIndex === 0) {
        tree.set(section, {children: new Map<string, TreeItem>()});
        continue;
      }

      const parentFolderName = sections[sectionIndex - 1];

      // Get the parent folder item from the tree
      let foundParentItem: any;

      if (pathIndex > 2) break;
      const parentItem = getParent(sections, section, parentFolderName, tree);
      // console.log(parentItem)
      // console.log(parentFolderName, '>', section)
      // console.log(foundParentItem)

      if (!foundParentItem) continue;

      foundParentItem.children.set(section, {children: new Map<string, TreeItem>()});
    }
  }