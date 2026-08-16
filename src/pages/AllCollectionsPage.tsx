import CollectionCard from '../components/CollectionCard'
import type { Collection } from '../types/Collection'
import './AllCollectionsPage.css'
import { useState } from 'react'

function AllCollectionsPage() {
    const [collections, setCollections] = useState<Collection[]>([    
        {
            id: 'abc123',
            title: 'Work',
        },
        {
            id: 'def456',
            title: 'Personal',
        },
        {
            id: 'ghi789',
            title: 'Projects',
        },
    ]);

    const [openCollectionId, setOpenCollectionId] = useState<string | null> (null) // returns nullable string

    function addCollection() {
        const newCollection: Collection = {
            id: crypto.randomUUID(),
            title: 'New Collection'
        };

        setCollections([...collections, newCollection]);
    }

    function deleteCollection(id: string) {
        setCollections(collections.filter((collection) => collection.id !== id));
    }

    function renameCollection(id: string, newTitle: string) {
        setCollections(collections.map((collection) => {
            if (collection.id === id) {
                return { ...collection, title: newTitle }
            }

            return collection;
        }))
    }

    function toggleCollectionMenu(id: string) {
        if (openCollectionId === id) {
            setOpenCollectionId(null)
        } else {
            setOpenCollectionId(id)
        }
    }
    
    return (
        <main>
            <h1>All Collections</h1>

            <div id="collections-list">
                {collections.map((collection) => (
                    <CollectionCard
                        key = {collection.id}
                        id = {collection.id}
                        title = {collection.title}
                        menuOpen = {openCollectionId === collection.id}
                        onMenuToggle = {() => {
                            toggleCollectionMenu(collection.id)
                        }}
                        onDelete = {deleteCollection}
                        onRename = {renameCollection}
                    />
                ))}

                <button id="add-collection-button" onClick={addCollection}>
                    Add Collection
                </button>
            </div>
        </main>
    )
}

export default AllCollectionsPage