import "./Modal.css"

const Modal = ({ title, isOpen, children }) => {
    return (
        <section
            onClick={() => isOpen(false)}
            className="modal-overlay">
            <article
                className="modal-news has-background-black-bis"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-news-content">
                    <div
                        title="بستن"
                        onClick={() => isOpen(false)}
                        className="btn-close">
                        <box-icon
                            size='md'
                            name='x-circle'
                            color='#f14668' >
                        </box-icon>
                    </div>
                    <h1 className="modal-news-title">{title}</h1>
                </div>
                <div className="is-flex is-justify-content-center">
                    {
                        children
                    }
                    <button
                        onClick={() => isOpen(false)}
                        className="button is-info mx-1"
                        type="button">
                        لغو
                    </button>
                </div>
            </article>
        </section>
    )
}

export default Modal