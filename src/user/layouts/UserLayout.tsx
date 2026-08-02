import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '@routes/paths';

import LogoutButton from '@auth/components/LogoutButton';

import '@styles/variables/user.variables.scss';
import '@styles/layouts/user-layout.scss';

export default function UserLayout() {
    const { t } = useTranslation('user');

    const location = useLocation();

    const links = [
        {
            path: ROUTES.USER_DASHBOARD,
            label: t('navigation.dashboard'),
        },
        {
            path: ROUTES.USER_PARTIES,
            label: t('navigation.parties'),
        },
        {
            path: ROUTES.USER_TICKETS,
            label: t('navigation.tickets'),
        },
        {
            path: ROUTES.USER_PURCHASES,
            label: t('navigation.purchases'),
        },
        {
            path: ROUTES.USER_PROFILE,
            label: t('navigation.profile'),
        },
    ];

    return (
        <div className="user-layout">
            <aside className="user-layout__sidebar">
                <nav className="user-layout__nav">
                    <div className="user-layout__links">
                        {links.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                className={({ isActive }) =>
                                    `user-layout__link ${
                                        isActive ? 'user-layout__link--active' : ''
                                    }`
                                }
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </div>

                    <div className="user-layout__footer">
                        <LogoutButton />
                    </div>
                </nav>
            </aside>

            <main className="user-layout__content">
                <Outlet key={location.pathname} />
            </main>
        </div>
    );
}
