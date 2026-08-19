import { useState, useRef, useEffect } from "react"
import type { Note, NoteColor } from "../types/Note"
import ColorOption from "./ColorOption"
import './NoteCard.css'
import paletteIcon from '../assets/palette-icon.png'

type NoteCardData = {
    note: Note
    onDelete: (id: string) => void
    onChange: (id: string, newTitle: string, newContent: string) => void
    onColorChange: (id: string, color: NoteColor) => void
}

function NoteCard({ note, onDelete, onChange, onColorChange }: NoteCardData) {
    const titleRef = useRef<HTMLTextAreaElement>(null)
    const contentRef = useRef<HTMLTextAreaElement>(null)

    const [paletteOpen, setPaletteOpen] = useState(false)

    function changeColor(color: NoteColor) {
        onColorChange(note.id, color)
        setPaletteOpen(false)
    }

    // Automatically adjust the height of the textarea based on content
    function autoSize(textarea: HTMLTextAreaElement | null) {
        if (!textarea) return
        textarea.style.height = 'auto'
        textarea.style.height = `${textarea.scrollHeight}px`
    }

    // Autosize after initial render to match content
    useEffect(() => {
        autoSize(titleRef.current)
        autoSize(contentRef.current)
    }, [])

    return (
        <div className={`note-card ${note.color ? `note-${note.color}` : ''}`}>
            <textarea ref={titleRef} className="title-field" value={note.title} autoFocus
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
                            onClick={(color) => changeColor(color)} 
                        />
                        <ColorOption color="red" 
                            active={note.color === 'red'}
                            onClick={(color) => changeColor(color)}
                        />
                        <ColorOption color="pink" 
                            active={note.color === 'pink'} 
                            onClick={(color) => changeColor(color)} 
                        />
                        <ColorOption color="blue" 
                            active={note.color === 'blue'} 
                            onClick={(color) => changeColor(color)} 
                        />
                        <ColorOption color="green" 
                            active={note.color === 'green'} 
                            onClick={(color) => changeColor(color)} 
                        />
                        <ColorOption color={null} 
                            active={note.color === null} 
                            onClick={(color) => changeColor(color)} 
                        />
                    </div>
                
                    <button className="image-button" onClick={() => { 
                        setPaletteOpen(!paletteOpen)
                    }}>
                        <img src={paletteIcon} alt="palette" width="24" height="24" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NoteCard