import {Suspense} from "react";
import {getUserRepos} from "../../server-actions/get-user-repos";
import "./style.scss";

export default async function ReposList() {
  const response = await getUserRepos();
  const repos: string[] = response.map((repo: {name: any}) => repo.name);

  return (
    <div id="reposListContainer">
      <h2>Your repos</h2>
      <Suspense fallback={<div>Loading repos</div>}>
        <div id="reposList">
          {repos.map((repoName: string) => (
            <div key={repoName} className="repo clickableItem">
              {repoName}
            </div>
          ))}
        </div>
      </Suspense>
    </div>
  );
}
