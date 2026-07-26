import SecurityLayout from '@layouts/SecurityLayout';
import RegisterForm from '@auth/components/RegisterForm';

export default function RegisterPage() {
    return (
        <SecurityLayout>
            <RegisterForm />
        </SecurityLayout>
    );
}
