import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import SecurityLayout from '@layouts/SecurityLayout';
import FormInput from '@components/forms/FormInput';

import { registerSchema } from '@auth/schemas/register.schema';
import type { RegisterRequest } from '@auth/types/auth.types';

import { useRegister } from '@auth/hooks/useRegister';

import { useTranslation } from 'react-i18next';

import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@routes/paths';

import '@styles/forms/security-form.scss';

type RegisterFormData = RegisterRequest;

export default function RegisterForm() {
    const { t } = useTranslation();

    const navigate = useNavigate();

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

    const registerMutation = useRegister();

    function submit(data: RegisterFormData) {
        registerMutation.mutate(data, {
            onSuccess() {
                navigate(ROUTES.VERIFY_EMAIL_SENT);
            },

            onError(error: any) {
                const message = error.response?.data?.error;

                if (!message) {
                    return;
                }

                if (message.includes('email')) {
                    setError('email', {
                        type: 'server',
                        message,
                    });

                    return;
                }

                if (message.includes('username')) {
                    setError('username', {
                        type: 'server',
                        message,
                    });

                    return;
                }

                setError('root', {
                    type: 'server',
                    message,
                });
            },
        });
    }

    return (
        <SecurityLayout>
            <form className="security-form" onSubmit={handleSubmit(submit)}>
                <FormInput
                    label={t('auth.username')}
                    placeholder={t('auth.usernamePlaceholder')}
                    error={errors.username?.message}
                    {...register('username')}
                />

                <FormInput
                    label={t('auth.email')}
                    type="email"
                    placeholder={t('auth.emailPlaceholder')}
                    error={errors.email?.message}
                    {...register('email')}
                />

                <FormInput
                    label={t('auth.password')}
                    type="password"
                    error={errors.password?.message}
                    {...register('password')}
                />

                <FormInput
                    label={t('auth.passwordConfirm')}
                    type="password"
                    error={errors.passwordConfirm?.message}
                    {...register('passwordConfirm')}
                />

                {errors.root && <p className="security-form__error">{errors.root.message}</p>}

                <button type="submit" disabled={registerMutation.isPending}>
                    {registerMutation.isPending ? t('common.loading') : t('auth.createAccount')}
                </button>
            </form>
        </SecurityLayout>
    );
}
