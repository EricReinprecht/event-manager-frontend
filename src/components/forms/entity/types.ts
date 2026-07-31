export type FormFieldType =
    | 'text'
    | 'textarea'
    | 'date'
    | 'time'
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

    required?: boolean;

    disabled?: boolean;

    fields?: FormFieldConfig[];

    rows?: FormFieldConfig[][];

    addLabel?: string;

    removeLabel?: string;

    itemLabel?: string;

    collapsible?: boolean;

    defaultOpen?: boolean;
}

export interface FormSectionConfig {
    title: string;

    fields?: FormFieldConfig[];

    rows?: FormFieldConfig[][];

    collapsible?: boolean;

    defaultOpen?: boolean;
}
