import type { Note } from "./Note"

export type Collection = {
    id: string
    title: string
    notes: Note[]
}