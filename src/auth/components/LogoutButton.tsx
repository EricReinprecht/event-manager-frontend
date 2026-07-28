import { useLogout } from '@auth/hooks/useLogout';
import { useTranslation } from 'react-i18next';

export default function LogoutButton() {
    const { t } = useTranslation('auth');

    const logout = useLogout();

    return (
        <button type="button" onClick={logout}>
            {t('common.logout')}
        </button>
    );
}
