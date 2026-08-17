import type { Collection } from '../types/Collection'

const STORAGE_KEY = 'collections'

export function getCollections(): Collection[] {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === null) {
        return []
    }

    return JSON.parse(stored)
}

export function saveCollections(collections: Collection[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(collections))
}