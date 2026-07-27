import { useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import SecurityLayout from '@layouts/SecurityLayout';

import { useVerifyEmail } from '@auth/hooks/useVerifyEmail';
import { setToken } from '@auth/storage/token.storage';

export default function VerifyEmailPage() {
    const [params] = useSearchParams();

    const navigate = useNavigate();

    const mutation = useVerifyEmail();

    const executed = useRef(false);

    useEffect(() => {
        if (executed.current) {
            return;
        }

        const token = params.get('token');

        if (!token) {
            return;
        }

        executed.current = true;

        mutation.mutate(token, {
            onSuccess(data) {
                setToken(data.token);

                navigate('/complete-profile');
            },
        });
    }, []);

    return (
        <SecurityLayout>
            {mutation.isPending && <p>Verifying email...</p>}

            {mutation.isError && <p>Verification failed.</p>}
        </SecurityLayout>
    );
}
