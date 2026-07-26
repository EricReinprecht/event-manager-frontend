import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import SecurityLayout from '@layouts/SecurityLayout';
import FormInput from '@components/forms/FormInput';

import { registerSchema } from '@auth/schemas/register.schema';
import type { RegisterRequest } from '@auth/types/auth.types';

import { useRegister } from '@auth/hooks/useRegister';

import { useTranslation } from 'react-i18next';

import { useNavigate } from 'react-router-dom';

import '@styles/forms/security-form.scss';

type RegisterFormData = RegisterRequest;

export default function RegisterForm() {
    const { t } = useTranslation();

    const navigate = useNavigate();

    const registerMutation = useRegister({
        onSuccess() {
            navigate('/complete-profile');
        },
    });

    const {
        register,
        handleSubmit,
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

    function submit(data: RegisterFormData) {
        registerMutation.mutate(data, {
            onSuccess() {
                console.log('registration successful');

                // later:
                // navigate("/verify-email")
            },

            onError(error) {
                console.error(error);
            },
        });
    }

    return (
        <SecurityLayout>
            <form className="security-form" onSubmit={handleSubmit(submit)}>
                <FormInput
                    label={t('auth.username')}
                    placeholder={t('auth.usernamePlaceholder')}
                    error={errors.username?.message && t(errors.username.message)}
                    {...register('username')}
                />

                <FormInput
                    label={t('auth.email')}
                    type="email"
                    placeholder={t('auth.emailPlaceholder')}
                    error={errors.email?.message && t(errors.email.message)}
                    {...register('email')}
                />

                <FormInput
                    label={t('auth.password')}
                    type="password"
                    error={errors.password?.message && t(errors.password.message)}
                    {...register('password')}
                />

                <FormInput
                    label={t('auth.passwordConfirm')}
                    type="password"
                    error={errors.passwordConfirm?.message && t(errors.passwordConfirm.message)}
                    {...register('passwordConfirm')}
                />

                {registerMutation.error && (
                    <p className="security-form__error">{t('errors.registerFailed')}</p>
                )}

                <button type="submit" disabled={registerMutation.isPending}>
                    {registerMutation.isPending ? t('common.loading') : t('auth.createAccount')}
                </button>
            </form>
        </SecurityLayout>
    );
}
