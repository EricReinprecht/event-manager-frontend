import { useTranslation } from 'react-i18next';

import { usePartyPublication } from '@user/hooks/usePartyPublication';

interface Props {
    partyId: string;
}

export default function PartyPublishButton({ partyId }: Props) {
    const { t } = useTranslation('user');
    const publish = usePartyPublication(partyId);

    return (
        <>
            <button
                type="button"
                className="form-button"
                disabled={publish.isPending}
                onClick={() => publish.mutate()}
            >
                {t('party.publication.publishNow')}
            </button>
            {publish.isError && <p className="form-error">{t('party.publication.error')}</p>}
        </>
    );
}
