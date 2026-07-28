import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import SecurityLayout from '@layouts/SecurityLayout';

import FormInput from '@components/forms/FormInput';
import FormButton from '@components/forms/FormButton';

import { useForgotPassword } from '@auth/hooks/useForgotPassword';

import { ROUTES } from '@routes/paths';

import '@styles/forms/security-form.scss';

type ForgotPasswordForm = {
    identifier: string;
};

export default function ForgotPasswordPage() {
    const { t } = useTranslation('auth');

    const mutation = useForgotPassword();

    const [success, setSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordForm>({
        defaultValues: {
            identifier: '',
        },
    });

    function submit(data: ForgotPasswordForm) {
        setSuccess(false);

        mutation.mutate(data, {
            onSuccess() {
                setSuccess(true);
            },
        });
    }

    return (
        <SecurityLayout>
            <form className="security-form" onSubmit={handleSubmit(submit)}>
                <FormInput
                    label={t('common.email')}
                    type="email"
                    placeholder={t('common.emailPlaceholder')}
                    autoComplete="email"
                    error={errors.identifier?.message}
                    {...register('identifier', {
                        required: t('common.emailRequired'),
                    })}
                />

                {success && <p className="security-form__success">{t('forgotPassword.success')}</p>}

                <FormButton type="submit" disabled={mutation.isPending}>
                    {mutation.isPending ? t('common.loading') : t('forgotPassword.submit')}
                </FormButton>

                <div className="auth-links">
                    <p className="auth-register">
                        {t('forgotPassword.rememberPassword')}{' '}
                        <Link to={ROUTES.LOGIN} className="auth-link">
                            {t('forgotPassword.login')}
                        </Link>
                    </p>
                </div>
            </form>
        </SecurityLayout>
    );
}
