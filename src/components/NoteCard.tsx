import { useState, useRef, useEffect } from "react"
import type { Note, NoteColor } from "../types/Note"
import ColorOption from "./ColorOption"
import './NoteCard.css'
import paletteIcon from '../assets/palette-icon.png'
import trashIcon from '../assets/trash-icon.png'

type NoteCardData = {
    note: Note
    onDelete: (id: string) => void
    onChange: (id: string, newTitle: string, newContent: string) => void
    onColorChange: (id: string, color: NoteColor) => void
    paletteOpen: boolean
    onPaletteToggle: (id: string) => void

    onDragStart: (id: string) => void
    onDragEnd: () => void
}

const HEIGHT_BUFFER = 5;

function NoteCard({ note, onDelete, onChange, onColorChange, paletteOpen, onPaletteToggle, onDragStart, onDragEnd }: NoteCardData) {
    const titleRef = useRef<HTMLTextAreaElement>(null)
    const contentRef = useRef<HTMLTextAreaElement>(null)
    const [dragging, setDragging] = useState(false)

    // Automatically adjust the height of the textarea based on content
    function autoSize(textarea: HTMLTextAreaElement | null) {
        if (!textarea) return
        textarea.style.height = 'auto'
        textarea.style.height = `${textarea.scrollHeight + HEIGHT_BUFFER}px` // buffer for descending characters
    }

    function handleDragStart(event: React.DragEvent) {
        setDragging(true)
    onDragStart(note.id)

    const dragImage = document.createElement('div')

    dragImage.textContent = note.title
  
    dragImage.classList.add('tooltip')

    if (note.color) {
        dragImage.classList.add(`note-${note.color}`)
    }
    document.body.appendChild(dragImage)

    event.dataTransfer.setDragImage(dragImage, 20, 20)

    setTimeout(() => {
        document.body.removeChild(dragImage)
    }, 0)
}
    function handleDragEnd() {
        onDragEnd()
        
        requestAnimationFrame(() => {
            setDragging(false)
        })
    }

    // Autosize after initial render to match content
    useEffect(() => {
        autoSize(titleRef.current)
        autoSize(contentRef.current)
    }, [])

    return (
        <div className={`note-card ${dragging ? 'dragging' : ''} ${note.color ? `note-${note.color}` : ''}`}
            draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd}
        >
            <textarea ref={titleRef} className="title-field" value={note.title}
                onChange={(event) => { 
                    onChange(note.id, event.target.value, note.content)
                    autoSize(titleRef.current)
                }}
                rows={1} 
            />

            <textarea ref={contentRef} className="content-field" value={note.content} 
                onChange={(event) => { 
                    onChange(note.id, note.title, event.target.value)
                    autoSize(contentRef.current)
                }}
                rows={1} 
            />

            <div className="note-footer">
                <div className={`color-picker ${paletteOpen ? 'open' : ''}`}>
                    <div className="option-container">
                        <ColorOption color="yellow" 
                            active={note.color === 'yellow'} 
                            onClick={(color) => onColorChange(note.id, color)} 
                        />
                        <ColorOption color="orange" 
                            active={note.color === 'orange'} 
                            onClick={(color) => onColorChange(note.id, color)} 
                        />
                        <ColorOption color="red" 
                            active={note.color === 'red'}
                            onClick={(color) => onColorChange(note.id, color)}
                        />
                        <ColorOption color="pink" 
                            active={note.color === 'pink'} 
                            onClick={(color) => onColorChange(note.id, color)} 
                        />
                        <ColorOption color="blue" 
                            active={note.color === 'blue'} 
                            onClick={(color) => onColorChange(note.id, color)} 
                        />
                        <ColorOption color="green" 
                            active={note.color === 'green'} 
                            onClick={(color) => onColorChange(note.id, color)} 
                        />
                        <ColorOption color={null} 
                            active={note.color === null} 
                            onClick={(color) => onColorChange(note.id, color)} 
                        />
                    </div>
                
                    <button className="image-button" onClick={() => { 
                        onPaletteToggle(note.id)
                    }}>
                        <img src={paletteIcon} alt="palette" width="24" height="24" />
                    </button>
                </div>
                <button className="image-button" onClick={() => {
                    onDelete(note.id)
                }}>
                    <img src={trashIcon} alt="palette" width="24" height="24" />
                </button>
            </div>
        </div>
    )
}

export default NoteCard