import { signal } from "@preact/signals-react";

export const itemToPush = signal<{ path: string, content: string }>()