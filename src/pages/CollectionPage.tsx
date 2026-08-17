import type { Collection } from '../types/Collection'
import NoteCard from '../components/NoteCard'
import { useState } from 'react'
import type { Note } from '../types/Note'
import { getCollections } from '../data/collections'
import { useParams } from 'react-router-dom'
import './CollectionPage.css'

function CollectionPage() {
    const { id } = useParams()

    const collections: Collection[] = getCollections()

    const collection = collections.find((collection) => collection.id === id)

    if (!collection) {
        return <h1>Collection not found</h1>
    }

    return (
        <main>
            <h1>{collection.title}</h1>
            <div id="card-section-container">
                <div className="card-section">
                    <div className="section-header">
                        <p>To-do</p>
                        <button className="add-note-button">+</button>
                    </div>
                </div>
                <div className="card-section">
                    <div className="section-header">
                        <p>In Progress</p>
                        <button className="add-note-button">+</button>
                    </div>
                </div>
                <div className="card-section">
                    <div className="section-header">
                        <p>Completed</p>
                        <button className="add-note-button">+</button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default CollectionPage