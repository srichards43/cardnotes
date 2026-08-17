import CollectionCard from '../components/CollectionCard'
import type { Collection } from '../types/Collection'
import './AllCollectionsPage.css'
import { useState } from 'react'
import { getCollections, saveCollections } from '../data/collections'

function AllCollectionsPage() {
    const [collections, setCollections] = useState<Collection[]>(
        getCollections()
    );

    const [openCollectionId, setOpenCollectionId] = useState<string | null> (null) // returns nullable string

    function addCollection() {
        const newCollection: Collection = {
            id: crypto.randomUUID(),
            title: 'New Collection'
        };

        const updatedCollections = [...collections, newCollection];
        setCollections(updatedCollections);
        saveCollections(updatedCollections);
    }

    function deleteCollection(id: string) {
        const updatedCollections = collections.filter((collection) => collection.id !== id);
        setCollections(updatedCollections);
        saveCollections(updatedCollections);
    }

    function renameCollection(id: string, newTitle: string) {
        const updatedCollections = collections.map((collection) => {
            if (collection.id === id) {
                return { ...collection, title: newTitle }
            }

            return collection;
        })

        setCollections(updatedCollections);
        saveCollections(updatedCollections);
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
                        collection = {collection}
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