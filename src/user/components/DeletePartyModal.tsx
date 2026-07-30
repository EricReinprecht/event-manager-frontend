import { useTranslation } from 'react-i18next';

import Modal from '@components/modal/Modal';

import type { UserParty } from '@user/types/parties.types';

interface Props {
    party: UserParty;

    onClose(): void;

    onConfirm(): void;
}

export default function DeletePartyModal({ party, onClose, onConfirm }: Props) {
    const { t } = useTranslation('user');
    const { t: tc } = useTranslation('common');

    return (
        <Modal
            title={t('party.delete.title')}
            onClose={onClose}
            footer={
                <>
                    <button className="btn" onClick={onClose}>
                        {tc('common.cancel')}
                    </button>

                    <button className="btn btn-danger" onClick={onConfirm}>
                        {tc('common.delete')}
                    </button>
                </>
            }
        >
            <p>{t('party.delete.confirm')}</p>

            <strong>{party.Title}</strong>
        </Modal>
    );
}
