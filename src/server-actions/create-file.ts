'use server'

import { base64encode } from 'byte-base64'

export async function createFile(
    filePath: string,
    fileContent: string
) {
    try {
        const url = `https://api.github.com/repos/LucaOttvn/DOCS/contents/${filePath}`

        const body = {
            message: `Create ${filePath}`,
            committer: {
                name: 'Luca Ottaviano',
                email: 'lucatremila@gmail.com'
            },
            content: base64encode(fileContent),
            branch: 'main',
        }

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${process.env.GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(`GitHub API Error: ${error.message}`)
        }

        const result = await response.json()
        return {
            success: true,
            file: result.content.html_url,
            commit: result.commit.html_url
        }
    } catch (error) {
        console.error(error)
        return error
    }
}
