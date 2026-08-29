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
    draggedNote: Note | null
}

function NoteSection({ title, status, notes, onAdd, onDelete, onChange, onColorChange, openPaletteId, onPaletteToggle, onDragStart, onDragOver, onDragEnd, onDrop, dropTarget, draggedNote }: SectionData) {

    // Go through all card midpoints in section and determine index
    function handleSectionDragOver(event: React.DragEvent) {
        event.preventDefault();

        const cards = Array.from(event.currentTarget.querySelectorAll('.note-card'))
        let dropIndex = cards.length

        // Iterate through midpoints to find index
        for (let i = 0; i < cards.length; i++) {
            const rect = cards[i].getBoundingClientRect()
            const midpoint = rect.top + rect.height / 2

            if (event.clientY < midpoint) {
                dropIndex = i
                break
            }
        }
        
        let draggedIndex = -1;
        if (draggedNote) {
            draggedIndex = notes.findIndex(n => n.id === draggedNote.id)
        }

        let finalIndex = dropIndex;
        if (draggedIndex !== -1 && draggedIndex < dropIndex) {
            finalIndex = dropIndex - 1
        }

        onDragOver(dropIndex, status)
    }

    // Helper method to check slot neighbors
    function isSlotAdjacentToDragged(slotIndex: number, notes: Note[], draggedNote: Note | null): boolean {
        if (!draggedNote) return false

        const prevNote = notes[slotIndex - 1]
        if (prevNote && prevNote.id === draggedNote.id) return true

        const nextNote = notes[slotIndex]
        if (nextNote && nextNote.id === draggedNote.id) return true

        return false
    }

    let indicatorClassName = 'drop-indicator'
    if (draggedNote && draggedNote.color) {
        indicatorClassName = indicatorClassName + ' note-' + draggedNote.color
    }

    // If target at end of list and not adjacent to dragged note, show indicator at end
    let showEndIndicator = false;
    if (dropTarget && dropTarget.section === status && dropTarget.index === notes.length) {
        if (!isSlotAdjacentToDragged(notes.length, notes, draggedNote)) {
            showEndIndicator = true
        }
    }

    return (
        <div className="card-section"
            onDragOver={(event) => {handleSectionDragOver(event)}}
            onDrop={() => onDrop()}
        >
            <div className="section-header">
                <p>{title} ({notes.length})</p>

                <button className="add-note-button" onClick={onAdd}>
                    +
                </button>
            </div>

            {notes.map((note, index) => {
                let showIndicator = false
                if (dropTarget && dropTarget.section === status && dropTarget.index === index) {
                    if (!isSlotAdjacentToDragged(index, notes, draggedNote)) {
                        showIndicator = true
                    }
                }

                return (
                    <Fragment key={note.id}>
                        {showIndicator && (
                            <div className={indicatorClassName} />
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
                )
            })}

            {showEndIndicator && (
                <div className={indicatorClassName} />
            )}
        </div>
    )
}

export default NoteSection