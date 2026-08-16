import CollectionCard from '../components/CollectionCard'
import type { Collection } from '../types/Collection'

// testing data
const collections: Collection[] = [
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
]

function AllCollectionsPage() {
    return (
        <main>
            <h1>All Collections</h1>
            
            <div>
                {collections.map((collection) => (
                    <CollectionCard
                        key={collection.id}
                        id={collection.id}
                        title={collection.title}
                        noteCount={0} // to replace
                    />
                ))}

                <button id="add-collection-button">Add Collection</button>
            </div>
        </main>
    )
}

export default AllCollectionsPage