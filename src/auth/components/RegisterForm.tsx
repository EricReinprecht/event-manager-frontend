import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import SecurityLayout from '@layouts/SecurityLayout';
import FormInput from '@components/forms/FormInput';
import FormButton from '@components/forms/FormButton';

import { registerSchema } from '@auth/schemas/register.schema';
import type { RegisterRequest } from '@auth/types/register.types';
import { useRegister } from '@auth/hooks/useRegister';

import { ROUTES } from '@routes/paths';

import '@styles/forms/security-form.scss';
import EyeIcon from '@/components/icons/Eye';

type RegisterFormData = RegisterRequest;

export default function RegisterForm() {
    const { t } = useTranslation('auth');

    const navigate = useNavigate();

    const mutation = useRegister();

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

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
        mutation.mutate(data, {
            onSuccess() {
                navigate(ROUTES.VERIFY_EMAIL_SENT);
            },

            onError(error: any) {
                const response = error.response?.data;

                if (!response) {
                    setError('root', {
                        type: 'server',
                        message: t('errors.unknown'),
                    });

                    return;
                }

                if (Array.isArray(response.errors)) {
                    setError('password', {
                        type: 'server',
                        message: response.errors.map((error: string) => t(error)).join('\n'),
                    });

                    return;
                }

                const message = response.error;

                if (!message) {
                    setError('root', {
                        type: 'server',
                        message: t('errors.unknown'),
                    });

                    return;
                }

                if (message.includes('email')) {
                    setError('email', {
                        type: 'server',
                        message: t(message),
                    });

                    return;
                }

                if (message.includes('username')) {
                    setError('username', {
                        type: 'server',
                        message: t(message),
                    });

                    return;
                }

                if (message.includes('password')) {
                    setError('password', {
                        type: 'server',
                        message: t(message),
                    });

                    return;
                }

                setError('root', {
                    type: 'server',
                    message: t(message),
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
                    type={showPassword ? 'text' : 'password'}
                    placeholder={t('common.passwordPlaceholder')}
                    error={translateError(errors.password?.message)}
                    rightIcon={
                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPassword((value) => !value)}
                        >
                            <EyeIcon size={20} />
                        </button>
                    }
                    {...register('password')}
                />

                <FormInput
                    label={t('common.passwordConfirm')}
                    type={showPasswordConfirm ? 'text' : 'password'}
                    placeholder={t('common.passwordConfirmPlaceholder')}
                    error={translateError(errors.passwordConfirm?.message)}
                    rightIcon={
                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPasswordConfirm((value) => !value)}
                        >
                            <EyeIcon size={20} />
                        </button>
                    }
                    {...register('passwordConfirm')}
                />

                {errors.root && <p className="security-form__error">{errors.root.message}</p>}

                <FormButton type="submit" disabled={mutation.isPending}>
                    {mutation.isPending ? t('common.loading') : t('common.createAccount')}
                </FormButton>
            </form>
        </SecurityLayout>
    );
}
