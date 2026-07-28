import SecurityLayout from '@layouts/SecurityLayout';
import LoginForm from '@auth/components/LoginForm';

export default function LoginPage() {
    return (
        <SecurityLayout>
            <LoginForm />
        </SecurityLayout>
    );
}
