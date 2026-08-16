import { Link } from "react-router-dom"

type CollectionCardData = {
    id: string
    title: string
    noteCount: number
}

function CollectionCard({ id, title, noteCount }: CollectionCardData) {
    return (
        <Link to={`/collection/${id}`} className="collection-card">
            <h2>{title}</h2>
            <p>{noteCount} notes</p>
        </Link>
    )
}

export default CollectionCard