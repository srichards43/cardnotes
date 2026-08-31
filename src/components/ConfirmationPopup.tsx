import './ConfirmationPopup.css'

type ConfirmationPopupData = {
    title: string
    message: string
    confirmLabel: string
    onConfirm: () => void
    onCancel: () => void
}

/* Popups used for deletion confirmation  */
function ConfirmationPopup({ title, message, confirmLabel, onConfirm, onCancel }: ConfirmationPopupData) {
    return (
        <div className="overlay">
            <div className="popup">
                <h2>{title}</h2>
                <div className="divider"></div>
                <p>{message}</p>
                <div className="hlg">
                    <button onClick={onCancel} className="border-button">Cancel</button>
                    <button onClick={onConfirm} className="delete-button border-button">{confirmLabel}</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationPopup