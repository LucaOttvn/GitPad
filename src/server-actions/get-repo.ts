export default async function getRepoContents() {
    try {
        // const response = await fetch('https://api.github.com/repos/LucaOttvn/DOCS/contents', {
        const response = await fetch('https://api.github.com/repos/LucaOttvn/DOCS/git/trees/main?recursive=1', {
            headers: {
                'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github+json'
            }
        })
        const result = await response.json()
        return result
    } catch (error) {
        console.log(error)
    }
}