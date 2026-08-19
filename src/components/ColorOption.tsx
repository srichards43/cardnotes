import type { NoteColor } from "../types/Note"
import './ColorOption.css'

type ColorOptionData = {
    color: NoteColor
    active: boolean
    onClick: (color: NoteColor) => void
}

function ColorOption({ color, active, onClick }: ColorOptionData) {
    return (
        <div className={`color-option ${active ? 'selected' : ''}`} 
            onClick={() => onClick(color)}
        >
            <div className={
                color ? `color-option-inner note-${color}` : 'color-option-inner no-color'}>
            </div>
        </div>
    )
}

export default ColorOption