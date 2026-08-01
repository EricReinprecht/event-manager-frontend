import axios from 'axios';

export interface ValidationErrorResponse {
    errors: Record<string, string>;
}

export function getValidationErrors(error: unknown): Record<string, string> | null {
    if (!axios.isAxiosError<ValidationErrorResponse>(error)) {
        return null;
    }

    if (error.response?.status !== 422) {
        return null;
    }

    const errors = error.response.data?.errors;

    if (!errors || typeof errors !== 'object' || Array.isArray(errors)) {
        return null;
    }

    return errors;
}
