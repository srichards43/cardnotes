export type Note = {
    id : string
    collectionId: string
    title: string
    content: string
    status: 'todo' | 'in-progress' | 'done'
}