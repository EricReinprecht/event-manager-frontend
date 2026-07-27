import { z } from 'zod';

export const completeProfileSchema = z.object({
    firstName: z.string().min(2, 'firstNameTooShort').max(50, 'firstNameTooLong'),

    lastName: z.string().min(2, 'lastNameTooShort').max(50, 'lastNameTooLong'),
});
