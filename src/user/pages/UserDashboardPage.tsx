import LogoutButton from '@auth/components/LogoutButton';

export default function UserDashboardPage() {
    return (
        <div>
            <h1>Dashboard</h1>

            <p>Welcome to your account.</p>

            <LogoutButton />
        </div>
    );
}
