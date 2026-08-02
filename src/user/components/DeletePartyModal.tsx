import { useTranslation } from 'react-i18next';

import Modal from '@components/modal/Modal';

import type { Party } from '@user/types/party.types';

interface Props {
    party: Party;

    onClose(): void;

    onConfirm(): void;

    pending?: boolean;
}

export default function DeletePartyModal({ party, onClose, onConfirm, pending = false }: Props) {
    const { t } = useTranslation('user');
    const { t: tc } = useTranslation('common');

    return (
        <Modal
            title={t('party.delete.title')}
            onClose={onClose}
            footer={
                <>
                    <button type="button" className="btn" disabled={pending} onClick={onClose}>
                        {tc('cancel')}
                    </button>

                    <button type="button" className="btn btn-danger" disabled={pending} onClick={onConfirm}>
                        {pending ? t('party.delete.deleting') : tc('delete')}
                    </button>
                </>
            }
        >
            <p>{t('party.delete.confirm')}</p>

            <strong>{party.title}</strong>
        </Modal>
    );
}
