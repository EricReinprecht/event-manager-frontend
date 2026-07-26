import { useForm } from 'react-hook-form';

import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import SecurityLayout from '@layouts/SecurityLayout';
import FormInput from '@components/forms/FormInput';

import '@styles/forms/security-form.scss';

import { useTranslation } from 'react-i18next';

const registerSchema = z
    .object({
        username: z.string().min(3, 'validation.username'),

        email: z.string().email('validation.email'),

        password: z.string().min(8, 'validation.password'),

        passwordConfirm: z.string(),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        path: ['passwordConfirm'],

        message: 'validation.passwordMatch',
    });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
    const { t } = useTranslation();

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
        console.log(data);

        /*
            later:

            registerMutation.mutate(data)

        */
    }

    return (
        <SecurityLayout>
            <form
                className="security-form"

                onSubmit={handleSubmit(submit)}
            >
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

                <button type="submit">{t('auth.createAccount')}</button>
            </form>
        </SecurityLayout>
    );
}
