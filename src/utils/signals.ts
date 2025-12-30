import { signal } from "@preact/signals-react";

/**
 * In the file-editor page the main component is the text editor, but it's not the only one in the page. The toolbar is visible, it contains the push button and and the user can interact with it.
* The text editor btw knows when the original content is unchanged or has some updates that need to be pushed because it        contains the content itself, but the toolbar doesn't; the push button needs to know when there are no updates to push though.
* This signal allows the toolbar to know when the current file actually contains updates to be pushed.
 */
export const itemToPush = signal<{ path: string, content: string }>()

// Share between the file-explorer page and the toolbar the editing state to know when the user is about to delete some files.
export const selectedFiles = signal<string[] | null>(null)