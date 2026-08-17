import { useState } from "react"
import type { Note } from "../types/Note"
import './NoteCard.css'

type NoteCardData = {
    note: Note
    onDelete: (id: string) => void
    onEdit: (id: string, newTitle: string, newContent: string) => void
}

function NoteCard({ note, onDelete, onEdit }: NoteCardData) {
    const [editing, setEditing] = useState(false)

    return (
        <div className="note-card">
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <div className="note-footer">
                <button className="edit-button" onClick={() => {
                    setEditing(true)
                }}>
                    <img src="/edit-icon.png" alt="Edit" />
                </button>
            </div>
        </div>
    )
}

export default NoteCard