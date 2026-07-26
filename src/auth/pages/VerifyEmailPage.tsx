import SecurityLayout from '@layouts/SecurityLayout';

export default function VerifyEmailPage() {
    return (
        <SecurityLayout>
            <h1>Check your email</h1>

            <p>We sent you a verification link. Please verify your email address to continue.</p>
        </SecurityLayout>
    );
}
