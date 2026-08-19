import NoteCard from "./NoteCard"
import type { Note, NoteColor } from "../types/Note"
import './NoteSection.css'

type SectionData = {
    title: string
    notes: Note[]
    onAdd: () => void
    onChange: (id: string, newTitle: string, newContent: string) => void
    onColorChange: (id: string, color: NoteColor) => void
}

function NoteSection({ title, notes, onAdd, onChange, onColorChange }: SectionData) {
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
                    onChange = {onChange}
                    onColorChange = {onColorChange}
                />
            ))}
        </div>
    )
}

export default NoteSection