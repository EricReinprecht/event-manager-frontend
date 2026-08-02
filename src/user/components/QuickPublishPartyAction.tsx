import type { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

import PublishIcon from '@/components/icons/Publish';
import type { Party } from '@user/types/party.types';

interface Props {
    party: Party;
    onPublish(party: Party): void;
}

export default function QuickPublishPartyAction({ party, onPublish }: Props) {
    const { t } = useTranslation('user');

    function openPublishModal(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        event.stopPropagation();
        onPublish(party);
    }

    return (
        <button
            type="button"
            className="action"
            title={t('party.publication.publishNow')}
            aria-label={t('party.publication.publishNow')}
            onClick={openPublishModal}
        >
            <PublishIcon size={24} aria-hidden="true" />
        </button>
    );
}
