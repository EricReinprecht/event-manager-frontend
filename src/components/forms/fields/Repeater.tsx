import FormField from '../entity/FormField';
import type { FormFieldConfig } from '../entity/types';
import CollapsibleSection from '../entity/CollapsibleSection';

interface Props {
    name: string;

    value?: any[];

    fields: FormFieldConfig[];

    rows?: FormFieldConfig[][];

    onChange(value: any[]): void;

    disabled?: boolean;

    addLabel: string;

    removeLabel: string;

    itemLabel: string;

    collapsible?: boolean;

    defaultOpen?: boolean;

    titleField?: string;

    titleFormatter?: (item: any, index: number) => string;

    errors?: Record<string, string>;

    depth?: number;

    validationAttempt?: number;

    path?: string;
}

export default function Repeater({
    name,
    value = [],
    fields = [],
    rows = [],
    onChange,
    disabled = false,
    addLabel = 'Add',
    removeLabel = 'Remove',
    itemLabel = 'Item',
    collapsible = true,
    defaultOpen = false,
    titleField,
    titleFormatter,
    errors = {},
    depth = 0,
    validationAttempt = 0,
    path,
}: Props) {
    const repeaterPath = path ?? name;

    function addItem() {
        onChange([...value, {}]);
    }

    function removeItem(index: number) {
        onChange(value.filter((_, itemIndex) => itemIndex !== index));
    }

    function updateItem(index: number, fieldName: string, newValue: unknown) {
        const items = [...value];

        items[index] = {
            ...items[index],
            [fieldName]: newValue,
        };

        onChange(items);
    }

    function getTitle(item: any, index: number) {
        if (titleFormatter) {
            return titleFormatter(item, index);
        }

        if (titleField && item[titleField]) {
            return item[titleField];
        }

        return `${itemLabel} ${index + 1}`;
    }

    function getFieldError(index: number, fieldName: string) {
        return errors[`${index}.${fieldName}`];
    }

    function getRepeaterError(index: number) {
        return errors[`${index}._repeater`];
    }

    function getChildErrors(index: number, fieldName: string) {
        const prefix = `${index}.${fieldName}.`;

        return Object.entries(errors).reduce<Record<string, string>>(
            (result, [errorPath, message]) => {
                if (!errorPath.startsWith(prefix)) {
                    return result;
                }

                result[errorPath.substring(prefix.length)] = message;

                return result;
            },
            {},
        );
    }

    function getItemErrorCount(index: number) {
        const prefix = `${index}.`;

        return Object.keys(errors).filter((errorPath) => errorPath.startsWith(prefix)).length;
    }

    function renderField(field: FormFieldConfig, item: any, index: number) {
        const fieldPath = `${repeaterPath}.${index}.${field.name}`;

        return (
            <FormField
                key={field.name}
                field={field}
                value={item[field.name]}
                disabled={disabled}
                error={getFieldError(index, field.name)}
                fieldErrors={getChildErrors(index, field.name)}
                repeaterDepth={depth + 1}
                validationAttempt={validationAttempt}
                errorKey={fieldPath}
                onChange={(fieldName, newValue) => updateItem(index, fieldName, newValue)}
            />
        );
    }

    function renderItem(item: any, index: number) {
        const repeaterError = getRepeaterError(index);

        const repeaterErrorKey = `${repeaterPath}.${index}._repeater`;

        return (
            <div className="form-repeater__item" data-error-key={repeaterErrorKey}>
                <div className="form-repeater__fields">
                    {fields.map((field) => renderField(field, item, index))}

                    {rows.map((row, rowIndex) => (
                        <div className="form-row" key={rowIndex}>
                            {row.map((field) => renderField(field, item, index))}
                        </div>
                    ))}
                </div>

                {repeaterError && <p className="form-error">{repeaterError}</p>}

                {!disabled && (
                    <button
                        type="button"
                        className="form-button form-button--danger"
                        onClick={() => removeItem(index)}
                    >
                        {removeLabel}
                    </button>
                )}
            </div>
        );
    }

    return (
        <div
            className="form-repeater"
            data-depth={depth}
            data-theme={depth % 2 === 0 ? 'even' : 'odd'}
        >
            {value.map((item, index) => {
                const errorCount = getItemErrorCount(index);

                if (collapsible) {
                    return (
                        <CollapsibleSection
                            key={index}
                            title={getTitle(item, index)}
                            defaultOpen={defaultOpen}
                            forceOpen={errorCount > 0}
                            forceOpenKey={validationAttempt}
                            errorCount={errorCount}
                            variant="repeater"
                        >
                            {renderItem(item, index)}
                        </CollapsibleSection>
                    );
                }

                return <div key={index}>{renderItem(item, index)}</div>;
            })}

            {!disabled && (
                <button
                    type="button"
                    className="form-button form-button--success"
                    onClick={addItem}
                >
                    {addLabel}
                </button>
            )}
        </div>
    );
}
