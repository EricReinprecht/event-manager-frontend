import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useLogin } from '@auth/hooks/useLogin';
import { setToken } from '@auth/storage/token.storage';
import { setRefreshToken } from '@auth/storage/refresh-token.storage';
import type { LoginRequest } from '@auth/types/login.types';

import FormInput from '@components/forms/FormInput';
import FormButton from '@components/forms/FormButton';

import { ROUTES } from '@routes/paths';
import EyeIcon from '@/components/icons/Eye';

export default function LoginForm() {
    const { t } = useTranslation('auth');

    const navigate = useNavigate();

    const mutation = useLogin();

    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginRequest>({
        defaultValues: {
            identifier: '',
            password: '',
        },
    });

    function submit(data: LoginRequest) {
        setLoginError('');

        mutation.mutate(data, {
            onSuccess(response) {
                setToken(response.accessToken);
                setRefreshToken(response.refreshToken);

                navigate(ROUTES.USER_DASHBOARD);
            },

            onError() {
                if (!data.identifier.includes('@')) {
                    setLoginError(t('login.usernameOrPasswordInvalid'));

                    return;
                }

                setLoginError(t('login.emailOrPasswordInvalid'));
            },
        });
    }

    return (
        <form className="security-form" onSubmit={handleSubmit(submit)}>
            <FormInput
                label={t('common.identifier')}
                type="text"
                placeholder={t('common.identifier')}
                autoComplete="username"
                error={errors.identifier?.message}
                {...register('identifier', {
                    required: t('common.identifierRequired'),
                })}
            />

            <FormInput
                label={t('common.password')}
                type={showPassword ? 'text' : 'password'}
                placeholder={t('common.passwordPlaceholder')}
                autoComplete="current-password"
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

            {loginError && <p className="form-error">{loginError}</p>}

            <FormButton type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? 'Signing in...' : 'Sign in'}
            </FormButton>
        </form>
    );
}
