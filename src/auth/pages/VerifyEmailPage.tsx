import { useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import SecurityLayout from '@layouts/SecurityLayout';

import { useVerifyEmail } from '@auth/hooks/useVerifyEmail';
import { setToken } from '@auth/storage/token.storage';

export default function VerifyEmailPage() {
    const [searchParams] = useSearchParams();

    const token = searchParams.get('token');
    const navigate = useNavigate();

    const mutation = useVerifyEmail(
        (data) => {
            console.log('SUCCESS CALLBACK', data);

            setToken(data.token);

            navigate('/complete-profile');
        },
        (error) => {
            console.error('ERROR CALLBACK', error);
        },
    );

    const executed = useRef(false);

    useEffect(() => {
        if (executed.current) {
            return;
        }

        if (!token) {
            return;
        }

        executed.current = true;

        console.log('TOKEN:', token);
        console.log('START VERIFY');

        mutation.mutate(token, {
            onSettled(data, error) {
                console.log('SETTLED', data, error);
            },

            onSuccess(data) {
                console.log('SUCCESS CALLBACK', data);

                setToken(data.token);

                navigate('/complete-profile');
            },

            onError(error) {
                console.error('ERROR CALLBACK', error);
            },
        });
    }, [token, navigate]);

    return (
        <SecurityLayout>
            {mutation.isPending && <p>Verifying email...</p>}

            {mutation.isError && <p>Verification failed.</p>}
        </SecurityLayout>
    );
}
