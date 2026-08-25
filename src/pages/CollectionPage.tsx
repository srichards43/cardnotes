import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'


import type { Collection } from '../types/Collection'
import NoteSection from '../components/NoteSection'
import type { Note, NoteColor } from '../types/Note'
import { getCollections, saveCollections } from '../data/collections'
import ConfirmationPopup from '../components/ConfirmationPopup'
import returnIcon from '../assets/return-icon.png'
import exportIcon from '../assets/export-icon.png'
import './CollectionPage.css'

function CollectionPage() {
    const { id } = useParams()

    const [collections, setCollections] = useState<Collection[]>(
        getCollections()
    )

    const collection = collections.find(
        collection => collection.id === id
    )

    const [noteToDelete, setNoteToDelete] = useState<String | null>(null)
    const deletingNote = collection?.notes.find(note => note.id === noteToDelete)

    const [draggedNoteId, setDraggedNoteId] = useState<string | null>(null)
    const [dropTarget, setDropTarget] = useState<{
        section: Note['status']
        index: number
    } | null>(null)

    const [openPaletteId, setOpenPaletteId] = useState<string | null>(null)

    const navigate = useNavigate()

    
    if (!collection) {
        return <h1>Collection not found</h1>
    }

    // Create new empty note and add it to the collection
    function addNote(status: Note['status']) {
        if (!collection) {
            return
        }

        const newNote: Note = {
            id: crypto.randomUUID(),
            title: 'New Note',
            content: '',
            collectionId: collection.id,
            status: status,
            color: null,
        }

        const updatedCollection = {
            ...collection,
            notes: [...collection.notes, newNote]
        }

        updateCollection(updatedCollection)
    }

    function deleteNote(id: string) {
       setNoteToDelete(id)
    }

    function confirmDeleteNote() {
        if (!noteToDelete || !collection) return

        const updatedCollection = {
            ...collection,
            notes: collection.notes.filter((note) => note.id !== noteToDelete)
        }

        updateCollection(updatedCollection)
        setNoteToDelete(null)
    }

    function updateNote(id: string, newTitle: string, newContent: string) {
        if (!collection) return

        const note = collection.notes.find((note) => note.id === id)
        if (!note) return
        const updatedNote = { ...note, title: newTitle, content: newContent }
        
        const updatedCollection = {
            ...collection,
            notes: collection.notes.map(note => {
                if (note.id === id) {
                    return updatedNote
                }
                return note
            })
        }

        updateCollection(updatedCollection)
    }

    function togglePalette(id: string) {
        if (openPaletteId === id) {
            setOpenPaletteId(null)
        } else {
            setOpenPaletteId(id)
        }
    }

    function changeNoteColor(id: string, newColor: NoteColor) {
        if (!collection) return

        const updatedNotes = collection.notes.map(note => {
            if (note.id === id) {
                return { ...note, color: newColor }
            }

            return note
        })

        const updatedCollection = {
            ...collection,
            notes: updatedNotes
        }

        updateCollection(updatedCollection)
    }

    function startDrag(id: string) {
        console.log(`Dragging note with id: ${id}`)
        setDraggedNoteId(id)
    }

    function handleDragOver(index: number, section: Note['status']) {
        setDropTarget({
            section,
            index
        })
    }

    function handleDrop() {
        if (!draggedNoteId || !collection || !dropTarget) return

        const { index, section } = dropTarget

        const draggedNote = collection.notes.find(note => note.id === draggedNoteId)
        if (!draggedNote) return

        const remainingNotes = collection.notes.filter(note => note.id !== draggedNoteId)

        const movedNote = {...draggedNote, status: section}

        const targetIds = remainingNotes.filter(note => note.status === section).map(note => note.id)

        if (index >= targetIds.length) {
            remainingNotes.push(movedNote);
        } else {
            const targetId = targetIds[index];
            const targetIndex = remainingNotes.findIndex(note => note.id === targetId);

            remainingNotes.splice(targetIndex, 0, movedNote);
        }
        
        updateCollection({...collection, notes: remainingNotes})

        setDraggedNoteId(null)
        setDropTarget(null)
    }

    // Helper function for updating collection notes
    function updateCollection(updatedCollection: Collection) {
        const updatedCollections = collections.map((collection) => {
            if (collection.id === updatedCollection.id) {
                return updatedCollection
            }

            return collection
        })

        setCollections(updatedCollections)
        saveCollections(updatedCollections)
    }

    return (
        <main>
            <div id="page-header">
                <button className="image-button" onClick={() => navigate('/')}>
                    <img src={returnIcon} alt="return" width="40" height="40" />
                </button>
                <h1>{collection.title}</h1>
                <button className="image-button" onClick={() => navigate('/')}>
                    <img src={exportIcon} alt="export" width="40" height="40" />
                </button>
            </div>
            <div id="card-section-container">
                <NoteSection
                    title="To Do"
                    status="todo"
                    notes={collection.notes.filter(note => note.status === 'todo')}
                    onAdd={() => addNote('todo')}
                    onDelete={deleteNote}
                    onChange={updateNote}
                    onColorChange={changeNoteColor}
                    openPaletteId={openPaletteId}
                    onPaletteToggle={togglePalette}
                    onDragStart={startDrag}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                />
                <NoteSection
                    title="In Progress"
                    status="in-progress"
                    notes={collection.notes.filter(note => note.status === 'in-progress')}
                    onAdd={() => addNote('in-progress')}
                    onDelete={deleteNote}
                    onChange={updateNote}
                    onColorChange={changeNoteColor}
                    openPaletteId={openPaletteId}
                    onPaletteToggle={togglePalette}
                    onDragStart={startDrag}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                />
                <NoteSection
                    title="Done"
                    status="done"
                    notes={collection.notes.filter(note => note.status === 'done')}
                    onAdd={() => addNote('done')}
                    onDelete={deleteNote}
                    onChange={updateNote}
                    onColorChange={changeNoteColor}
                    openPaletteId={openPaletteId}
                    onPaletteToggle={togglePalette}
                    onDragStart={startDrag}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
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