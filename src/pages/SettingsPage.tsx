import { useNavigate } from 'react-router-dom'
import returnIcon from '../assets/return-icon.png'
import './SettingsPage.css'

function SettingsPage() {
    const navigate = useNavigate()
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
                    <div className="settings-entry">
                        <p>Disable spell check</p>
                        <input type="checkbox" />
                    </div>
                    <div className="settings-entry">
                        <p>Theme</p>
                    </div>
                </div>
                <div className="settings-card">
                    <h2>Data</h2>
                    <div className="settings-entry">
                        <p>Save/load data</p>
                    <div className="hlg">
                        <button className="border-button">
                            Import
                        </button>
                        <button className="border-button">
                            Export
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        </main>
        
    )
}

export default SettingsPage