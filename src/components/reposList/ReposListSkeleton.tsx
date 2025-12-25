import "./reposList.scss";

export default function ReposListSkeleton() {
  return (
    <div id="reposListContainer">
      <h2>Select your repo</h2>
      <div id="reposList">
        {Array.from({length: 10}).map((_, i) => (
          <div key={"repoSkeleton" + i} className="repoSkeleton"></div>
        ))}
      </div>
    </div>
  );
}
