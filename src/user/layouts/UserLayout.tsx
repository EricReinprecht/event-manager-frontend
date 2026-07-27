import { Outlet, NavLink } from 'react-router-dom';

export default function UserLayout() {
    return (
        <div className="user-layout">
            <aside className="user-layout__sidebar">
                <nav>
                    <NavLink to="/user/parties">Parties</NavLink>

                    <NavLink to="/user/profile">Profile</NavLink>
                </nav>
            </aside>

            <main className="user-layout__content">
                <Outlet />
            </main>
        </div>
    );
}
