import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import SecurityLayout from '@layouts/SecurityLayout';
import FormInput from '@components/forms/FormInput';
import FormButton from '@components/forms/FormButton';

import { useResendVerification } from '@auth/hooks/useResendVerification';
import type { ResendVerificationRequest } from '@auth/types/resend-verification.types';

import '@styles/forms/security-form.scss';

export default function ResendVerificationPage() {
    const { t } = useTranslation('auth');

    const mutation = useResendVerification();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResendVerificationRequest>({
        defaultValues: {
            email: '',
        },
    });

    function submit(data: ResendVerificationRequest) {
        mutation.mutate(data);
    }

    return (
        <SecurityLayout>
            <form className="security-form" onSubmit={handleSubmit(submit)}>
                <h1>{t('resendVerification.title')}</h1>

                <p>{t('resendVerification.description')}</p>

                <FormInput
                    label={t('common.email')}
                    type="email"
                    placeholder={t('common.emailPlaceholder')}
                    error={errors.email?.message}
                    {...register('email', {
                        required: t('common.emailRequired'),
                    })}
                />

                {mutation.isError && (
                    <p className="security-form__error">{t('resendVerification.error')}</p>
                )}

                {mutation.isSuccess && (
                    <p className="security-form__success">{t('resendVerification.success')}</p>
                )}

                <FormButton type="submit" disabled={mutation.isPending}>
                    {mutation.isPending ? t('common.loading') : t('resendVerification.submit')}
                </FormButton>
            </form>
        </SecurityLayout>
    );
}
