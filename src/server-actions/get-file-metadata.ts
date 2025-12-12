'use server'

import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import getGithubApiUrl from "./get-github-api-url";

/**
 * Get file's SHA based on path.
 * @param filePath 
 */
export default async function getFileMetadata(filePath: string): Promise<{ sha: string; content: string } | null> {
  try {
    const baseUrl = await getGithubApiUrl()
    const session = await getServerSession(authOptions) as any
    const url = `${baseUrl}/contents/${filePath}`;

    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch file metadata: ${response.statusText}`);
    }

    return await response.json(); // JSON with sha and base64 content

  } catch (error) {
    console.error(error)
    return null
  }
}
