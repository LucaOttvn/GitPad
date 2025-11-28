export interface Folder {
    path: string
    children: Folder[] | Content[]
}

export interface Content {
    name: string
}