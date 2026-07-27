import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import { useCompleteProfile } from '@user/hooks/useCompleteProfile';
import type { CompleteProfileRequest } from '@user/types/user.types';

import { ROUTES } from '@routes/paths';

export default function CompleteProfileForm() {
    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const mutation = useCompleteProfile();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CompleteProfileRequest>({
        defaultValues: {
            firstName: '',
            lastName: '',
        },
    });

    function submit(data: CompleteProfileRequest) {
        mutation.mutate(data, {
            onSuccess() {
                queryClient.invalidateQueries({
                    queryKey: ['me'],
                });

                navigate(ROUTES.USER_DASHBOARD);
            },
        });
    }

    return (
        <form className="security-form" onSubmit={handleSubmit(submit)}>
            <input
                placeholder="First name"
                autoComplete="given-name"
                {...register('firstName', {
                    required: true,
                })}
            />

            {errors.firstName && <p>First name is required</p>}

            <input
                placeholder="Last name"
                autoComplete="family-name"
                {...register('lastName', {
                    required: true,
                })}
            />

            {errors.lastName && <p>Last name is required</p>}

            {mutation.isError && (
                <p>
                    {mutation.error instanceof Error
                        ? mutation.error.message
                        : 'Could not save profile'}
                </p>
            )}

            <button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? 'Saving...' : 'Save profile'}
            </button>
        </form>
    );
}
