export const validationMessages = {
    required: 'This field is required.',

    minLength: (length: number) => `Must be at least ${length} characters.`,

    maxLength: (length: number) => `Must not exceed ${length} characters.`,

    pattern: 'Invalid format.',

    min: (value: number) => `Must be at least ${value}.`,

    max: (value: number) => `Must not exceed ${value}.`,
};
