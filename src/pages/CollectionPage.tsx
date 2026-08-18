import type { Collection } from '../types/Collection'
import NoteCard from '../components/NoteCard'
import NoteSection from '../components/NoteSection'
import { useState } from 'react'
import type { Note } from '../types/Note'
import { getNotes, saveNotes } from '../data/notes'
import { getCollections } from '../data/collections'
import { useParams } from 'react-router-dom'
import './CollectionPage.css'

function CollectionPage() {
    const { id } = useParams()

    const collections: Collection[] = getCollections()

    const collection = collections.find((collection) => collection.id === id)

    const [notes, setNotes] = useState<Note[]>(getNotes())

    const [editingNoteId, setEditingNoteId] = useState<string | null>(null)

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
            status: status
        }

        const updatedNotes = [...getNotes(), newNote]

        setNotes(updatedNotes)
        saveNotes(updatedNotes)
    }

    function toggleEdit(id: string, newTitle: string, newContent: string) {
        if (editingNoteId === id) {
            const updatedNotes = notes.map((note) => {
                if (note.id === id) {
                    return { ...note, title: newTitle, content: newContent }
                }
                return note
            })

            setNotes(updatedNotes)
            saveNotes(updatedNotes)
            setEditingNoteId(null)
        } else {
            setEditingNoteId(id)
        }
    }

    return (
        <main>
            <h1>{collection.title}</h1>
            <div id="card-section-container">
                <NoteSection
                    title="To Do"
                    notes={notes.filter((note) => note.collectionId === collection.id && note.status === 'todo')}
                    onAdd={() => addNote('todo')}
                    onEditToggle={toggleEdit}
                    editingNoteId={editingNoteId}
                />
                <NoteSection
                    title="In Progress"
                    notes={notes.filter((note) => note.collectionId === collection.id && note.status === 'in-progress')}
                    onAdd={() => addNote('in-progress')}
                    onEditToggle={toggleEdit}
                    editingNoteId={editingNoteId}
                />
                <NoteSection
                    title="Done"
                    notes={notes.filter((note) => note.collectionId === collection.id && note.status === 'done')}
                    onAdd={() => addNote('done')}
                    onEditToggle={toggleEdit}
                    editingNoteId={editingNoteId}
                />
            </div>
        </main>
    )
}

export default CollectionPage