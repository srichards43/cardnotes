import type { Note } from '../types/Note'

const STORAGE_KEY = 'notes'

export function getNotes(): Note[] {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === null) {
        return []
    }

    return JSON.parse(stored)
}

export function saveNotes(notes: Note[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
}