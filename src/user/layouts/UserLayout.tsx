import { NavLink, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '@routes/paths';

import '@styles/layouts/user-layout.scss';

export default function UserLayout() {
    const { t } = useTranslation('user');

    return (
        <div className="user-layout">
            <aside className="user-layout__sidebar">
                <nav className="user-layout__nav">
                    <NavLink
                        to={ROUTES.USER_DASHBOARD}
                        className={({ isActive }) =>
                            `user-layout__link ${isActive ? 'user-layout__link--active' : ''}`
                        }
                    >
                        {t('navigation.dashboard')}
                    </NavLink>

                    <NavLink
                        to={ROUTES.USER_PARTIES}
                        className={({ isActive }) =>
                            `user-layout__link ${isActive ? 'user-layout__link--active' : ''}`
                        }
                    >
                        {t('navigation.parties')}
                    </NavLink>

                    <NavLink
                        to={ROUTES.USER_TICKETS}
                        className={({ isActive }) =>
                            `user-layout__link ${isActive ? 'user-layout__link--active' : ''}`
                        }
                    >
                        {t('navigation.tickets')}
                    </NavLink>

                    <NavLink
                        to={ROUTES.USER_PURCHASES}
                        className={({ isActive }) =>
                            `user-layout__link ${isActive ? 'user-layout__link--active' : ''}`
                        }
                    >
                        {t('navigation.purchases')}
                    </NavLink>

                    <NavLink
                        to={ROUTES.USER_PROFILE}
                        className={({ isActive }) =>
                            `user-layout__link ${isActive ? 'user-layout__link--active' : ''}`
                        }
                    >
                        {t('navigation.profile')}
                    </NavLink>
                </nav>
            </aside>

            <main className="user-layout__content">
                <Outlet />
            </main>
        </div>
    );
}
