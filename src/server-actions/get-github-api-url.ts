'use server'
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { authOptions } from "../app/api/auth/[...nextauth]/route";

/**
 * Get the base url for Github apis filled with username and selected repo name.
*/
export default async function getGithubApiUrl() {
    try {
        const session = await getServerSession(authOptions) as any;
        if (!session || !session.user || !session.user.name) {
            throw Error('No valid Github session')
        }
        const cookieStore = await cookies();
        if (!cookieStore) throw Error('Failed to retrieve cookies')

        const selectedRepo = cookieStore.get('selectedRepo')?.value;
        if (!selectedRepo) throw Error('No selected repo found')

        return `https://api.github.com/repos/${session?.user?.name}/${selectedRepo}`
    } catch (error) {
        console.error(error)
    }
}