import type { FormFieldConfig } from './field.types';

export interface FormSectionConfig {
    id: string;

    title: string;

    fields?: FormFieldConfig[];

    rows?: FormFieldConfig[][];

    collapsible?: boolean;

    defaultOpen?: boolean;

    clearable?: boolean;

    clearLabel?: string;

    validate?: (values: Record<string, any>) => string | null;
}
