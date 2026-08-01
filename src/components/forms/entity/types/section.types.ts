import type { FormFieldConfig } from './field.types';

export interface FormSectionConfig {
    title: string;

    fields?: FormFieldConfig[];

    rows?: FormFieldConfig[][];

    collapsible?: boolean;

    defaultOpen?: boolean;
}
