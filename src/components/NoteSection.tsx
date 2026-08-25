import NoteCard from "./NoteCard"
import type { Note, NoteColor } from "../types/Note"
import './NoteSection.css'
import { Fragment } from 'react'

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
    onDragEnd: () => void
    onDrop: () => void
    dropTarget: { section: Note['status'], index: number } | null
}

function NoteSection({ title, status, notes, onAdd, onDelete, onChange, onColorChange, openPaletteId, onPaletteToggle, onDragStart, onDragOver, onDragEnd, onDrop, dropTarget }: SectionData) {

    // Go through all card midpoints in section and determine index
    function handleSectionDragOver(event: React.DragEvent) {
        event.preventDefault()

        const cards = Array.from(event.currentTarget.querySelectorAll('.note-card'))
        let dropIndex = notes.length

        for (let i = 0; i < cards.length; i++) {
            const rect = cards[i].getBoundingClientRect()
            const midpoint = rect.top + rect.height / 2

            if (event.clientY < midpoint) {
                dropIndex = i
                break
            }
        }

        onDragOver(dropIndex, status)
    }
    
    return (
        <div className="card-section"
            onDragOver={(event) => {handleSectionDragOver(event)}}
            onDrop={() => onDrop()}
        >
                
            <div className="section-header">
                <p>{title}</p>

                <button className="add-note-button" onClick={onAdd}>
                    +
                </button>
            </div>

            {notes.map((note, index) => (
                <Fragment key={note.id}>
                    {dropTarget?.section === status &&
                    dropTarget.index === index && (
                        <div className="drop-indicator" />
                    )}

                    <NoteCard
                        note={note}
                        onDelete={onDelete}
                        onChange={onChange}
                        onColorChange={onColorChange}
                        paletteOpen={openPaletteId === note.id}
                        onPaletteToggle={onPaletteToggle}
                        onDragStart={onDragStart}
                        onDragEnd={onDragEnd}
                    />
                </Fragment>
            ))}

            {/* Show drop indicator at end of list if final note */}
            {dropTarget?.section === status &&
            dropTarget.index === notes.length && (
                <div className="drop-indicator" />
            )}
        </div>
    )
}

export default NoteSection