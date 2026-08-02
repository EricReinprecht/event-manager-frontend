import { useTranslation } from 'react-i18next';

import Modal from '@components/modal/Modal';

interface Props {
    partyTitle: string;
    pending?: boolean;
    error?: boolean;
    onClose(): void;
    onConfirm(): void;
}

export default function PublishPartyModal({
    partyTitle,
    pending = false,
    error = false,
    onClose,
    onConfirm,
}: Props) {
    const { t } = useTranslation('user');
    const { t: tc } = useTranslation('common');

    return (
        <Modal
            title={t('party.publication.confirmTitle')}
            onClose={onClose}
            footer={
                <>
                    <button type="button" className="btn" disabled={pending} onClick={onClose}>
                        {tc('cancel')}
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger"
                        disabled={pending}
                        onClick={onConfirm}
                    >
                        {pending ? t('party.publication.publishing') : tc('publish')}
                    </button>
                </>
            }
        >
            <p>{t('party.publication.confirm')}</p>
            <strong>{partyTitle}</strong>
            <p>{t('party.publication.irreversible')}</p>
            {error && <p className="form-error">{t('party.publication.error')}</p>}
        </Modal>
    );
}
