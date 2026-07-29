export type FormFieldType =
    | 'text'
    | 'textarea'
    | 'date'
    | 'datetime'
    | 'number'
    | 'select'
    | 'multiselect'
    | 'location'
    | 'hidden';

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

    required?: boolean;
}

export interface FormSectionConfig {
    title: string;

    fields: FormFieldConfig[];
}
