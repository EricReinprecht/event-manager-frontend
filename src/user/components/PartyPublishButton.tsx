import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { usePartyPublication } from '@user/hooks/usePartyPublication';
import PublishPartyModal from './PublishPartyModal';

interface Props {
    partyId: string;
    partyTitle: string;
}

export default function PartyPublishButton({ partyId, partyTitle }: Props) {
    const { t } = useTranslation('user');
    const publish = usePartyPublication(partyId);
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                className="form-button"
                disabled={publish.isPending}
                onClick={() => setModalOpen(true)}
            >
                {t('party.publication.publishNow')}
            </button>
            {publish.isError && <p className="form-error">{t('party.publication.error')}</p>}
            {modalOpen && (
                <PublishPartyModal
                    partyTitle={partyTitle}
                    pending={publish.isPending}
                    error={publish.isError}
                    onClose={() => setModalOpen(false)}
                    onConfirm={() =>
                        publish.mutate(undefined, {
                            onSuccess: () => setModalOpen(false),
                        })
                    }
                />
            )}
        </>
    );
}
