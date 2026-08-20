import NoteCard from "./NoteCard"
import type { Note, NoteColor } from "../types/Note"
import './NoteSection.css'

type SectionData = {
    title: string
    notes: Note[]
    onAdd: () => void
    onDelete: (id: string) => void
    onChange: (id: string, newTitle: string, newContent: string) => void
    onColorChange: (id: string, color: NoteColor) => void
    openPaletteId: string | null
    onPaletteToggle: (id: string) => void
}

function NoteSection({ title, notes, onAdd, onDelete, onChange, onColorChange, openPaletteId, onPaletteToggle }: SectionData) {
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
                    onDelete = {onDelete}
                    onChange = {onChange}
                    onColorChange = {onColorChange}
                    paletteOpen = {openPaletteId === note.id}
                    onPaletteToggle = {onPaletteToggle}
                />
            ))}
        </div>
    )
}

export default NoteSection