import { z } from 'zod';

export const registerSchema = z
    .object({
        username: z
            .string()
            .min(1, {
                error: 'validation.usernameRequired',
            })
            .min(3, {
                error: 'validation.usernameLength',
            }),

        email: z
            .string()
            .min(1, {
                error: 'validation.emailRequired',
            })
            .pipe(
                z.email({
                    error: 'validation.emailInvalid',
                }),
            ),

        password: z
            .string()
            .min(1, {
                error: 'validation.passwordRequired',
            })
            .min(12, {
                error: 'validation.passwordLength',
            })
            .max(128, {
                error: 'validation.passwordMaxLength',
            }),

        passwordConfirm: z.string().min(1, {
            error: 'validation.passwordConfirmRequired',
        }),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        path: ['passwordConfirm'],
        error: 'validation.passwordMatch',
    });
