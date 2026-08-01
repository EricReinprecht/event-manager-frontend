import type { FormFieldConfig, FormSectionConfig } from '@components/forms/entity/types';

export default function validateForm(values: Record<string, any>, sections: FormSectionConfig[]) {
    const errors: Record<string, string> = {};

    function validateField(field: FormFieldConfig, value: any, path?: string) {
        const name = path ?? field.name;
        const rules = field.validation;

        if (rules) {
            if (rules.required && (value === undefined || value === null || value === '')) {
                errors[name] = rules.message?.required ?? 'This field is required.';

                return;
            }

            if (
                typeof value === 'string' &&
                rules.minLength !== undefined &&
                value.length < rules.minLength
            ) {
                errors[name] = rules.message?.minLength ?? `Minimum length is ${rules.minLength}`;

                return;
            }

            if (
                typeof value === 'string' &&
                rules.maxLength !== undefined &&
                value.length > rules.maxLength
            ) {
                errors[name] = rules.message?.maxLength ?? `Maximum length is ${rules.maxLength}`;

                return;
            }

            if (typeof value === 'string' && rules.pattern && !rules.pattern.test(value)) {
                errors[name] = rules.message?.pattern ?? 'Invalid format.';

                return;
            }

            if (typeof value === 'number' && rules.min !== undefined && value < rules.min) {
                errors[name] = rules.message?.min ?? `Minimum value is ${rules.min}`;

                return;
            }

            if (typeof value === 'number' && rules.max !== undefined && value > rules.max) {
                errors[name] = rules.message?.max ?? `Maximum value is ${rules.max}`;

                return;
            }
        }

        if (field.type !== 'repeater' || !Array.isArray(value)) {
            return;
        }

        value.forEach((item, index) => {
            if (field.validate) {
                const itemErrors = field.validate(item, values);

                const repeaterMessage = Object.values(itemErrors).find(
                    (message): message is string =>
                        typeof message === 'string' && message.length > 0,
                );

                if (repeaterMessage) {
                    errors[`${name}.${index}._repeater`] = repeaterMessage;
                }
            }

            field.fields?.forEach((child) => {
                validateField(child, item[child.name], `${name}.${index}.${child.name}`);
            });

            field.rows?.flat().forEach((child) => {
                validateField(child, item[child.name], `${name}.${index}.${child.name}`);
            });
        });
    }

    sections.forEach((section) => {
        if (section.validate) {
            const sectionError = section.validate(values);

            if (sectionError) {
                errors[`_section_${section.id}`] = sectionError;
            }
        }

        section.fields?.forEach((field) => {
            validateField(field, values[field.name]);
        });

        section.rows?.flat().forEach((field) => {
            validateField(field, values[field.name]);
        });
    });

    return errors;
}
