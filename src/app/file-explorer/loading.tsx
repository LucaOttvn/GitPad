import "./style.scss";
export default function FileExplorerSkeleton() {
  return (
    <div className="fileExplorerSkeleton">
      <div className="breadCrumbsSkeleton"></div>
      <div className="fileExplorerGridSkeleton">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
          <div key={i} className="treeItemSkeleton"></div>
        ))}
      </div>
    </div>
  );
}
