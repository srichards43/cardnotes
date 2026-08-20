import './ConfirmationPopup.css'

type ConfirmationPopupData = {
    title: string
    message: string
    onConfirm: () => void
    onCancel: () => void
}

/* Popups used for deletion confirmation  */
function ConfirmationPopup({ title, message, onConfirm, onCancel }: ConfirmationPopupData) {
    return (
        <div className="overlay">
            <div className="popup">
                <h2>{title}</h2>
                <div className="divider"></div>
                <p>{message}</p>
                <div className="hlg">
                    <button onClick={onCancel}>Cancel</button>
                    <button onClick={onConfirm} className="delete-button">Delete</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationPopup