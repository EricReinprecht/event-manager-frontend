import SecurityLayout from '@layouts/SecurityLayout';

export default function VerifyEmailPendingPage() {
    return (
        <SecurityLayout>
            <h1>Check your email</h1>

            <p>We sent you a verification link.</p>

            <p>Click the link in your email to activate your account.</p>
        </SecurityLayout>
    );
}
