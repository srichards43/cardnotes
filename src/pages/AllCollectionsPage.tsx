import CollectionCard from '../components/CollectionCard'
import type { Collection } from '../types/Collection'
import './AllCollectionsPage.css'
import { useState } from 'react'
import { getCollections, saveCollections } from '../data/collections'
import ConfirmationPopup from '../components/ConfirmationPopup'
import exportIcon from '../assets/export-icon.png'

function AllCollectionsPage() {
    const [collections, setCollections] = useState<Collection[]>(
        getCollections()
    );

    const [openCollectionId, setOpenCollectionId] = useState<string | null> (null) // returns nullable string
    const [collectionToDelete, setCollectionToDelete] = useState<String | null>(null)
    const deletingCollection = collections.find((collection) => collection.id === collectionToDelete)

    function addCollection() {
        const newCollection: Collection = {
            id: crypto.randomUUID(),
            title: 'New Collection',
            notes: []
        };

        const updatedCollections = [...collections, newCollection];
        setCollections(updatedCollections);
        saveCollections(updatedCollections);
    }

    function deleteCollection(id: string) {
           setCollectionToDelete(id)
        }
    
    function confirmDeleteCollection() {
        if (!collectionToDelete) return

        const updatedCollections = collections.filter((collection) => collection.id !== collectionToDelete)
        setCollections(updatedCollections)
        saveCollections(updatedCollections)
        setCollectionToDelete(null)
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
            <div id="page-header">
                <div></div>
                <h1>All Collections</h1>
                <button className="image-button">
                    <img src={exportIcon} alt="export" width="40" height="40" />
                </button>
            </div>
            <div id="collections-list">
                {collections.map((collection) => (
                    <CollectionCard
                        key = {collection.id}
                        collection = {collection}
                        cardCount = {collection.notes.length}
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
            {collectionToDelete && (
                <ConfirmationPopup 
                    title = "Delete Collection"
                    message = {`Are you sure you want to delete the collection "${deletingCollection?.title}"?\nThis action cannot be undone.`}
                    onConfirm = {confirmDeleteCollection}
                    onCancel = {() => setCollectionToDelete(null)}
                />
            )}
        </main>
    )
}

export default AllCollectionsPage