import { useNavigate } from 'react-router-dom'
import { useState, useRef } from 'react'
import returnIcon from '../assets/return-icon.png'
import ConfirmationPopup from '../components/ConfirmationPopup'
import './SettingsPage.css'

type SettingsPageData = {
   theme: 'system' | 'light' | 'dark'
   setTheme: (theme: 'system' | 'light' | 'dark') => void
}

function SettingsPage({ theme, setTheme }: SettingsPageData) {
    const navigate = useNavigate()
    const [showIds, setShowIds] = useState(() => {
        return localStorage.getItem('showCollectionIds') === 'true'
    })
    const [spellCheckEnabled, setSpellCheckEnabled] = useState(() => {
        return localStorage.getItem('spellCheckEnabled') === 'true'
    })

    function exportData() {
        const allData: Record<string, string> = {}

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i)
            if (key) {
                allData[key] = localStorage.getItem(key) || ''
            }
        }

        const json = JSON.stringify(allData, null, 2)
        const blob = new Blob([json], { type: 'application/json' })
        const url = URL.createObjectURL(blob)

        // Create temporary link for download
        const link = document.createElement('a')
        link.href = url
        link.download = 'cardnotes-data.json'
        link.click()
        URL.revokeObjectURL(url)
    }

    const [importFile, setImportFile] = useState<File | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    function getImportFile(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0]

        if (!file) return

        setImportFile(file)

        // Allows selecting the same file again
        event.target.value = ''
    }

    async function importData(file: File) {
        try {
            const text = await file.text()
            const data = JSON.parse(text)

            // Verify data before clearing old
            if (typeof data !== 'object' || data === null) {
                throw new Error('Incorrect format')
            }
            
            const allData: Record<string, string> = {}
            for (const [key, value] of Object.entries(data)) {
                if (typeof value !== 'string') {
                    throw new Error('Non-string value found')
                }

                allData[key] = value
            }
                
            localStorage.clear()

            for (const [key, value] of Object.entries(allData)) {
                localStorage.setItem(key, value)
            }

            window.location.reload()
        } catch (error) {
            alert(`Invalid data file: ${(error as Error).message}`)
        }

        setImportFile(null)
    }

    return (
        <main>
            <div id="page-header">
                <button className="image-button" onClick={() => navigate('/')}>
                        <img src={returnIcon} alt="return" width="40" height="40" />
                    </button>
                <h1>Settings</h1>
                <div className="empty-header"></div>
            </div>
            <div id="settings">
                <div className="settings-card">
                    <h2>Display</h2>
                    <label className="settings-entry">
                        <p>Enable spell check</p>
                        <input type="checkbox" checked={spellCheckEnabled} onChange={(event) => {
                            setSpellCheckEnabled(event.currentTarget.checked)
                            localStorage.setItem('spellCheckEnabled', event.currentTarget.checked.toString())
                        }} />
                    </label>
                    <label className="settings-entry">
                        <p>Show collection IDs</p>
                        <input type="checkbox" checked={showIds} onChange={(event) => {
                            setShowIds(event.currentTarget.checked)
                            localStorage.setItem('showCollectionIds', event.currentTarget.checked.toString())
                        }} />
                    </label>
                </div>
                <div className="settings-card">
                    <h2>Theme</h2>
                    <label className="settings-entry">
                        <p>System</p>
                        <input type="radio" name="theme" value="system" checked={theme === 'system'} onChange={() => setTheme('system')} />
                    </label>
                    <label className="settings-entry">
                        <p>Light</p>
                        <input type="radio" name="theme" value="light" checked={theme === 'light'} onChange={() => setTheme('light')} />
                    </label>
                    <label className="settings-entry">
                        <p>Dark</p>
                        <input type="radio" name="theme" value="dark" checked={theme === 'dark'} onChange={() => setTheme('dark')} />
                    </label>
                </div>
                <div className="settings-card">
                    <h2>Data</h2>
                    <label className="settings-entry" onClick={() => fileInputRef.current?.click()}>
                        <p>Import</p>
                        <p className="arrow">❯</p>
                    </label>
                    <label className="settings-entry" onClick={exportData}>
                        <p>Export</p>
                        <p className="arrow">❯</p>
                    </label>
                </div>
            </div>
            {importFile && (
                <ConfirmationPopup 
                    title = "Import Data"
                    message = {`Are you sure you want to import the data from "${importFile.name}"?\nThis will overwrite existing data and cannot be undone.`}
                    confirmLabel = "Overwrite"
                    onConfirm={() => importData(importFile)}
                    onCancel = {() => setImportFile(null)}
                />
            )}
            <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                hidden
                onChange={getImportFile}
            />
        </main>
        
    )
}

export default SettingsPage