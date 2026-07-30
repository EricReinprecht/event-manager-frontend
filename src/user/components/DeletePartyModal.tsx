import Modal from '@components/modal/Modal';

import type { UserParty } from '@user/types/parties.types';

interface Props {
    party: UserParty;

    onClose(): void;

    onConfirm(): void;
}

export default function DeletePartyModal({ party, onClose, onConfirm }: Props) {
    return (
        <Modal
            title="Delete party"

            onClose={onClose}

            footer={
                <>
                    <button className="btn" onClick={onClose}>
                        Cancel
                    </button>

                    <button className="btn btn-danger" onClick={onConfirm}>
                        Delete
                    </button>
                </>
            }
        >
            <p>Are you sure you want to delete:</p>

            <strong>{party.Title}</strong>
        </Modal>
    );
}
