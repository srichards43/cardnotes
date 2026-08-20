import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'


import type { Collection } from '../types/Collection'
import NoteSection from '../components/NoteSection'
import type { Note, NoteColor } from '../types/Note'
import { getNotes, saveNotes } from '../data/notes'
import { getCollections } from '../data/collections'
import ConfirmationPopup from '../components/ConfirmationPopup'
import returnIcon from '../assets/return-icon.png'
import './CollectionPage.css'

function CollectionPage() {
    const { id } = useParams()

    const collections: Collection[] = getCollections()

    const collection = collections.find((collection) => collection.id === id)

    const [notes, setNotes] = useState<Note[]>(getNotes())

    const [noteToDelete, setNoteToDelete] = useState<String | null>(null)
    const deletingNote = notes.find((note) => note.id === noteToDelete)

    const [openPaletteId, setOpenPaletteId] = useState<string | null>(null)

    const navigate = useNavigate()

    
    if (!collection) {
        return <h1>Collection not found</h1>
    }

    function addNote(status: Note['status']) {
        if (!collection) {
            return
        }

        const newNote: Note = {
            id: crypto.randomUUID(),
            title: 'New Note',
            content: 'Note content',
            collectionId: collection.id,
            status: status,
            color: null
        }

        const updatedNotes = [...notes, newNote]

        setNotes(updatedNotes)
        saveNotes(updatedNotes)
    }

    function deleteNote(id: string) {
       setNoteToDelete(id)
    }

    function confirmDeleteNote() {
        if (!noteToDelete) return

        const updatedNotes = notes.filter((note) => note.id !== noteToDelete)
        setNotes(updatedNotes)
        saveNotes(updatedNotes)
        setNoteToDelete(null)
    }

    function updateNote(id: string, newTitle: string, newContent: string) {
        const updatedNotes = notes.map((note) => {
            if (note.id === id) {
                return { ...note, title: newTitle, content: newContent }
            }
            return note
        })

        setNotes(updatedNotes)
        saveNotes(updatedNotes)
    }

    function togglePalette(id: string) {
        if (openPaletteId === id) {
            setOpenPaletteId(null)
        } else {
            setOpenPaletteId(id)
        }
    }

    function changeNoteColor(id: string, newColor: NoteColor) {
        const updatedNotes = notes.map((note) => {
            if (note.id === id) {
                return { ...note, color: newColor }
            }
            return note
        })

        setNotes(updatedNotes)
        saveNotes(updatedNotes)
    }

    return (
        <main>
            <div id="collection-header">
                <button className="image-button" onClick={() => navigate('/')}>
                    <img src={returnIcon} alt="return" width="40" height="40" />
                </button>
                <h1>{collection.title}</h1>
                <div></div>
            </div>
            <div id="card-section-container">
                <NoteSection
                    title="To Do"
                    notes={notes.filter((note) => note.collectionId === collection.id && note.status === 'todo')}
                    onAdd={() => addNote('todo')}
                    onDelete={deleteNote}
                    onChange={updateNote}
                    onColorChange={changeNoteColor}
                    openPaletteId={openPaletteId}
                    onPaletteToggle={togglePalette}
                />
                <NoteSection
                    title="In Progress"
                    notes={notes.filter((note) => note.collectionId === collection.id && note.status === 'in-progress')}
                    onAdd={() => addNote('in-progress')}
                    onDelete={deleteNote}
                    onChange={updateNote}
                    onColorChange={changeNoteColor}
                    openPaletteId={openPaletteId}
                    onPaletteToggle={togglePalette}
                />
                <NoteSection
                    title="Done"
                    notes={notes.filter((note) => note.collectionId === collection.id && note.status === 'done')}
                    onAdd={() => addNote('done')}
                    onDelete={deleteNote}
                    onChange={updateNote}
                    onColorChange={changeNoteColor}
                    openPaletteId={openPaletteId}
                    onPaletteToggle={togglePalette}
                />
            </div>
            {noteToDelete && deletingNote && (
                <ConfirmationPopup
                    title="Confirm Note Deletion"
                    message={`Are you sure you want to delete "${deletingNote.title}"?\n This action cannot be undone.`}
                    onConfirm={confirmDeleteNote}
                    onCancel={() => setNoteToDelete(null)}
                />
                )}
        </main>
    )
}

export default CollectionPage