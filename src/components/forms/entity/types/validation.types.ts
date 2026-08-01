export interface ValidationConfig {
    required?: boolean;

    minLength?: number;

    maxLength?: number;

    min?: number;

    max?: number;

    pattern?: RegExp;

    message?: ValidationMessages;
}

export interface ValidationMessages {
    required?: string;

    minLength?: string;

    maxLength?: string;

    min?: string;

    max?: string;

    pattern?: string;
}
