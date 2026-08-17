import { useState } from "react"
import { Link } from "react-router-dom"
import type { Collection } from "../types/Collection"
import './CollectionCard.css'

type CollectionCardData = {
    collection: Collection
    menuOpen: boolean
    onMenuToggle: () => void
    onDelete: (id: string) => void
    onRename: (id: string, newTitle: string) => void
}

function CollectionCard({ collection, menuOpen, onMenuToggle, onDelete, onRename }: CollectionCardData) {
    const [editing, setEditing] = useState(false)

    function saveTitle(newTitle: string) {
        newTitle = newTitle.trim()

        if (newTitle !== '') {
            onRename(collection.id, newTitle)
        }

        setEditing(false)
    }
    
    return (
        <Link to={`/collection/${collection.id}`} className="collection-card">
            <div className="vlg">

                {/* Replace heading with focused input when editing */}
                {editing ? (
                    <input id="title-field" defaultValue={collection.title} autoFocus 
                        onBlur={(event) => {
                            saveTitle(event.currentTarget.value.trim())
                        }} 
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                saveTitle(event.currentTarget.value.trim())
                            }
                        }}
                        onClick={(event) => {
                            event.preventDefault(); // block link action
                        }}
                    />
                ) : (
                    <h2>{collection.title}</h2>
                )}

                <p>#{collection.id}</p>
            </div>

            <div className="collection-menu-container">
                <button className="collection-menu-button" onClick={(event) => {
                    event.preventDefault(); // block link action
                    onMenuToggle();
                }}>
                    ⋮
                </button>

                {/* Only render menu when open */}
                {menuOpen && (
                    <div className="collection-menu">
                        <button onClick={(event) => {
                            event.preventDefault(); // block link action
                            setEditing(true);
                            onMenuToggle();
                        }}
                        >
                            Rename
                        </button>
                        <button className="delete-button" onClick={(event) => {
                            event.preventDefault(); // block link action
                            onDelete(collection.id);
                        }}>
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </Link>
    )
}

export default CollectionCard