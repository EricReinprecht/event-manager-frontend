import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import SecurityLayout from '@layouts/SecurityLayout';
import FormInput from '@components/forms/FormInput';

import { registerSchema } from '@auth/schemas/register.schema';
import type { RegisterRequest } from '@auth/types/auth.types';
import { useRegister } from '@auth/hooks/useRegister';

import { ROUTES } from '@routes/paths';

import '@styles/forms/security-form.scss';

type RegisterFormData = RegisterRequest;

export default function RegisterForm() {
    const { t } = useTranslation('auth');

    const navigate = useNavigate();

    const registerMutation = useRegister();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),

        defaultValues: {
            username: '',
            email: '',
            password: '',
            passwordConfirm: '',
        },
    });

    function translateError(message?: string) {
        if (!message) {
            return undefined;
        }

        return t(message);
    }

    function submit(data: RegisterFormData) {
        registerMutation.mutate(data, {
            onSuccess() {
                navigate(ROUTES.VERIFY_EMAIL_SENT);
            },

            onError(error: any) {
                const response = error.response?.data;

                /*
                        Password validator
                    */

                if (Array.isArray(response?.errors)) {
                    setError('password', {
                        type: 'server',
                        message: response.errors.map((e: string) => t(e)).join('\n'),
                    });

                    return;
                }

                /*
                        Field errors
                    */

                if (response?.field && response?.error) {
                    setError(response.field, {
                        type: 'server',
                        message: t(response.error),
                    });

                    return;
                }

                /*
                        Generic backend error
                    */

                setError('root', {
                    type: 'server',
                    message: t(response?.error ?? 'errors.unknown'),
                });
            },
        });
    }

    return (
        <SecurityLayout>
            <form className="security-form" onSubmit={handleSubmit(submit)}>
                <FormInput
                    label={t('common.username')}
                    placeholder={t('common.usernamePlaceholder')}
                    error={translateError(errors.username?.message)}
                    {...register('username')}
                />

                <FormInput
                    label={t('common.email')}
                    type="email"
                    placeholder={t('common.emailPlaceholder')}
                    error={translateError(errors.email?.message)}
                    {...register('email')}
                />

                <FormInput
                    label={t('common.password')}
                    type="password"
                    error={translateError(errors.password?.message)}
                    {...register('password')}
                />

                <FormInput
                    label={t('common.passwordConfirm')}
                    type="password"
                    error={translateError(errors.passwordConfirm?.message)}
                    {...register('passwordConfirm')}
                />

                {errors.root && <p className="security-form__error">{errors.root.message}</p>}

                <button type="submit" disabled={registerMutation.isPending}>
                    {registerMutation.isPending ? t('common.loading') : t('common.createAccount')}
                </button>
            </form>
        </SecurityLayout>
    );
}
