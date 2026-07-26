import { z } from 'zod';

export const registerSchema = z
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
