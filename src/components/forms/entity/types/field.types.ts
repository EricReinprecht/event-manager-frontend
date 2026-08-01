import type { ValidationConfig } from '../types';

export type FormFieldType =
    | 'text'
    | 'textarea'
    | 'date'
    | 'time'
    | 'datetime'
    | 'number'
    | 'checkbox'
    | 'select'
    | 'multiselect'
    | 'location'
    | 'hidden'
    | 'repeater';

export interface FormFieldOption {
    label: string;
    value: string;
}

export interface FormFieldConfig {
    name: string;

    label: string;

    type: FormFieldType;

    placeholder?: string;

    options?: FormFieldOption[];

    disabled?: boolean;

    /*
    |--------------------------------------------------------------------------
    | Validation
    |--------------------------------------------------------------------------
    */

    required?: boolean;

    validation?: ValidationConfig;

    /*
    |--------------------------------------------------------------------------
    | Repeater
    |--------------------------------------------------------------------------
    */

    fields?: FormFieldConfig[];

    rows?: FormFieldConfig[][];

    addLabel?: string;

    removeLabel?: string;

    itemLabel?: string;

    collapsible?: boolean;

    defaultOpen?: boolean;

    titleField?: string;

    titleFormatter?: (item: any, index: number) => string;

    validate?: (value: any, values?: Record<string, any>) => Partial<Record<string, string>>;
}
