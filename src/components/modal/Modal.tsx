import type { ReactNode } from 'react';

import './modal.scss';

interface Props {
    title: string;
    children: ReactNode;

    onClose(): void;

    footer?: ReactNode;
}

export default function Modal({ title, children, onClose, footer }: Props) {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal__header">
                    <h2>{title}</h2>

                    <button className="modal__close" onClick={onClose}>
                        ×
                    </button>
                </div>

                <div className="modal__body">{children}</div>

                {footer && <div className="modal__footer">{footer}</div>}
            </div>
        </div>
    );
}
