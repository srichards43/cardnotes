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
    onDragOver: (index: number, status: Note['status']) => void
    onDrop: (index: number, status: Note['status']) => void
}

function NoteSection({ title, status, notes, onAdd, onDelete, onChange, onColorChange, openPaletteId, onPaletteToggle, onDragStart, onDragOver, onDrop }: SectionData) {
    return (
        <div className="card-section"
            onDragOver={(event) => {
                event.preventDefault(); 
                onDragOver(notes.length, status)
            }}
            onDrop={() => onDrop(notes.length, status)}
        >
            <div className="section-header">
                <p>{title}</p>

                <button className="add-note-button" onClick={onAdd}>
                    +
                </button>
            </div>

            {notes.map((note, index) => (
                <NoteCard
                    key = {note.id}
                    note = {note}
                    onDelete = {onDelete}
                    onChange = {onChange}
                    onColorChange = {onColorChange}
                    paletteOpen = {openPaletteId === note.id}
                    onPaletteToggle = {onPaletteToggle}
                    onDragStart = {onDragStart}
                    onDragOver = {(position) => {
                        let dropIndex = index

                        if (position === 'below') {
                            dropIndex += 1
                        }
                        onDragOver(dropIndex, status)
                    }}
                />
            ))}
        </div>
    )
}

export default NoteSection