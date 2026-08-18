import NoteCard from "./NoteCard"
import type { Note } from "../types/Note"
import './NoteSection.css'

type SectionData = {
    title: string
    notes: Note[]
    onAdd: () => void
    onEditToggle: (id: string, newTitle: string, newContent: string) => void
    editingNoteId?: string | null
}

function NoteSection({ title, notes, onAdd, onEditToggle, editingNoteId }: SectionData) {
    return (
        <div className="card-section">
            <div className="section-header">
                <p>{title}</p>

                <button className="add-note-button" onClick={onAdd}>
                    +
                </button>
            </div>

            {notes.map((note) => (
                <NoteCard
                    key = {note.id}
                    note = {note}
                    onDelete = {(id) => {}}
                    onEditToggle = {onEditToggle}
                    isEditing = {editingNoteId === note.id}
                />
            ))}
        </div>
    )
}

export default NoteSection