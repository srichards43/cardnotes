import { useState, useRef, useEffect } from "react"
import type { Note } from "../types/Note"
import './NoteCard.css'
import editIcon from '../assets/edit-icon.png'
import cancelEditIcon from '../assets/edit-cancel-icon.png'

type NoteCardData = {
    note: Note
    onDelete: (id: string) => void
    onEditToggle: (id: string, newTitle: string, newContent: string) => void
    isEditing?: boolean | null
}

function NoteCard({ note, onDelete, onEditToggle, isEditing }: NoteCardData) {
    const [title, setTitle] = useState(note.title)
    const [content, setContent] = useState(note.content)
    const titleRef = useRef<HTMLTextAreaElement>(null)
    const contentRef = useRef<HTMLTextAreaElement>(null)

    // Automatically adjust the height of the textarea based on content
    function autoSize(textarea: HTMLTextAreaElement | null) {
        if (!textarea) return
        textarea.style.height = 'auto'
        textarea.style.height = `${textarea.scrollHeight}px`
    }

    // Observe isEditing and instantly autosize when entering edit mode
    useEffect(() => {
        if (!isEditing) return

        autoSize(titleRef.current)
        autoSize(contentRef.current)
    }, [isEditing])

    return (
        <div className="note-card">
            { isEditing ? (
                <>
                    <textarea ref={titleRef} className="title-field" defaultValue={title} 
                        onChange={(event) => setTitle(event.target.value)}
                    />

                    <textarea ref={contentRef} className="content-field" value={content} autoFocus 
                        onChange={(event) => {
                            setContent(event.target.value)
                            autoSize(contentRef.current)
                        }} rows={1}
                    />

                    <div className="note-footer">
                        <button className="image-button" onClick={() => { 
                            onEditToggle(note.id, title, content)
                        }}>
                            <img src={cancelEditIcon} alt="Cancel" width="24" height="24" />
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <h2>{note.title}</h2>
                    <p>{note.content}</p>
                    <div className="note-footer">
                        <button className="image-button" onClick={() => {
                            onEditToggle(note.id, note.title, note.content)
                        }}>
                            <img src={editIcon} alt="Edit" width="24" height="24" />
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}

export default NoteCard