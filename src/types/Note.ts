export type NoteColor = 'yellow' | 'blue' | 'green' | 'red' | 'orange' | 'pink' | null

export type Note = {
    id : string
    collectionId: string
    title: string
    content: string
    status: 'todo' | 'in-progress' | 'done'
    color: NoteColor
}