import React from 'react'
import ReactDOM from 'react-dom';
import "./modalStyle.css"




function Modal({ children, onClose }) {
    return ReactDOM.createPortal(
        <>
            <div className="overlay">
                <div className="modalStyle">
                    <button className='btn btn-danger fs-4' style={{ marginLeft: '90%', marginTop: '-35px' }} onClick={onClose}>X</button>
                    {children}
                </div>
            </div>
        </>,
        document.getElementById('cart')
    )
}

export default Modal;