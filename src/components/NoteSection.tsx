import NoteCard from "./NoteCard"
import type { Note, NoteColor } from "../types/Note"
import './NoteSection.css'

type SectionData = {
    title: string
    status: Note['status']
    notes: Note[]
    onAdd: () => void
    onDelete: (id: string) => void
    onChange: (id: string, newTitle: string, newContent: string) => void
    onColorChange: (id: string, color: NoteColor) => void
    openPaletteId: string | null
    onPaletteToggle: (id: string) => void
    onDragStart: (id: string) => void
    onDragOver: (event: React.DragEvent, index: number, status: Note['status']) => void
    onDrop: (status: Note['status'], index: number) => void
}

function NoteSection({ title, status, notes, onAdd, onDelete, onChange, onColorChange, openPaletteId, onPaletteToggle, onDragStart, onDragOver, onDrop }: SectionData) {
    return (
        <div className="card-section"
            onDragOver={(event) => onDragOver(event, notes.length, status)}
            onDrop={() => onDrop(status, notes.length)}
        >
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
                    onDragStart = {onDragStart}
                />
            ))}
        </div>
    )
}

export default NoteSection