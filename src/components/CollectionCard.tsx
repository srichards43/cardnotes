import { useState } from "react"
import { Link } from "react-router-dom"
import './CollectionCard.css'

type CollectionCardData = {
    id: string
    title: string
    menuOpen: boolean
    onMenuToggle: () => void
    onDelete: (id: string) => void
    onRename: (id: string, newTitle: string) => void
}

function CollectionCard({ id, title, menuOpen, onMenuToggle, onDelete, onRename }: CollectionCardData) {
    const [editing, setEditing] = useState(false)

    function saveTitle(newTitle: string) {
        newTitle = newTitle.trim()

        if (newTitle !== '') {
            onRename(id, newTitle)
        }

        setEditing(false)
    }
    
    return (
        <Link to={`/collection/${id}`} className="collection-card">
            <div className="vlg">

                {/* Replace heading with focused input when editing */}
                {editing ? (
                    <input defaultValue={title} autoFocus 
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
                    <h2>{title}</h2>
                )}

                <p>#{id}</p>
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
                            onDelete(id);
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