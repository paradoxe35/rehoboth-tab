import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Modal } from 'bootstrap'

const BsModal = ({ children, modalRef = null, keepAlive = false, render = null }) => {
    const modal = useRef(null)
    const ref = useRef(null)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (ref.current) {
            modal.current = new Modal(ref.current)
            modalRef.current = modal.current

            ref.current.addEventListener('hide.bs.modal', () => setOpen(false))
            ref.current.addEventListener('show.bs.modal', () => setOpen(true))
        }
        return () => modal.current && modal.current.dispose()
    }, [ref.current])


    return createPortal(<div className="modal fade" ref={ref} tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable" role="document">
            <div className="modal-content">
                <div className="modal-body pb-2">
                    {keepAlive ? children(render, ref.current) : (open ? children(render, ref.current) : [])}
                </div>
                <div className="modal-footer">
                    <button
                        type="button"
                        className="btn btn-secondary btn-sm text-white"
                        data-bs-dismiss="modal">Fermer</button>
                </div>
            </div>
        </div>
    </div>, document.body)
}

export default BsModal