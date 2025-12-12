"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";

export async function getUserRepos() {
    const session = await getServerSession(authOptions) as any;

    if (!session?.accessToken) {
        throw new Error("Not authenticated");
    }

    const response = await fetch("https://api.github.com/user/repos", {
        headers: {
            Authorization: `Bearer ${session.accessToken}`,
            "Accept": "application/vnd.github+json",
        },
    });

    if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos = await response.json();
    return repos.filter((repo: any) => repo.owner.login === repo.full_name.split("/")[0]);
}
