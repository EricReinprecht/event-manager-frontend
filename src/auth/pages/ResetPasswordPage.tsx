import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import SecurityLayout from '@layouts/SecurityLayout';

import FormInput from '@components/forms/FormInput';
import FormButton from '@components/forms/FormButton';

import EyeIcon from '@components/icons/Eye';

import { useResetPassword } from '@auth/hooks/useResetPassword';

import { ROUTES } from '@routes/paths';

import '@styles/forms/security-form.scss';

type ResetPasswordForm = {
    password: string;
    passwordConfirm: string;
};

export default function ResetPasswordPage() {
    const { t } = useTranslation('auth');

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const token = searchParams.get('token');

    const mutation = useResetPassword();

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    const [success, setSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<ResetPasswordForm>({
        defaultValues: {
            password: '',
            passwordConfirm: '',
        },
    });

    function submit(data: ResetPasswordForm) {
        if (!token) {
            return;
        }

        mutation.mutate(
            {
                token,
                newPassword: data.password,
            },
            {
                onSuccess() {
                    setSuccess(true);

                    setTimeout(() => {
                        navigate(ROUTES.LOGIN);
                    }, 2000);
                },
            },
        );
    }

    return (
        <SecurityLayout>
            <form className="security-form" onSubmit={handleSubmit(submit)}>
                {!token && (
                    <p className="security-form__error">{t('resetPassword.invalidToken')}</p>
                )}

                <FormInput
                    label={t('common.password')}
                    type={showPassword ? 'text' : 'password'}
                    placeholder={t('common.passwordPlaceholder')}
                    error={errors.password?.message}
                    rightIcon={
                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPassword((value) => !value)}
                        >
                            <EyeIcon size={20} />
                        </button>
                    }
                    {...register('password', {
                        required: t('validation.passwordRequired'),
                    })}
                />

                <FormInput
                    label={t('common.passwordConfirm')}
                    type={showPasswordConfirm ? 'text' : 'password'}
                    placeholder={t('common.passwordConfirmPlaceholder')}
                    error={errors.passwordConfirm?.message}
                    rightIcon={
                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPasswordConfirm((value) => !value)}
                        >
                            <EyeIcon size={20} />
                        </button>
                    }
                    {...register('passwordConfirm', {
                        required: t('validation.passwordRequired'),

                        validate(value) {
                            return value === watch('password') || t('validation.passwordMismatch');
                        },
                    })}
                />

                {success && <p className="security-form__success">{t('resetPassword.success')}</p>}

                <FormButton type="submit" disabled={mutation.isPending || !token}>
                    {mutation.isPending ? t('common.loading') : t('resetPassword.submit')}
                </FormButton>

                <div className="auth-links">
                    <p className="auth-register">
                        <Link to={ROUTES.LOGIN} className="auth-link">
                            {t('resetPassword.backToLogin')}
                        </Link>
                    </p>
                </div>
            </form>
        </SecurityLayout>
    );
}
