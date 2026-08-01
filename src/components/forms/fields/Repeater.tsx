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
}: Props) {
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

    function getItemErrors(index: number) {
        const prefix = `${name}.${index}.`;

        return Object.entries(errors)
            .filter(([key]) => key.startsWith(prefix))
            .map(([, message]) => message);
    }

    function renderItem(item: any, index: number) {
        const itemErrors = getItemErrors(index);

        return (
            <div className="form-repeater__item">
                <div className="form-repeater__fields">
                    {fields.map((field) => (
                        <FormField
                            key={field.name}
                            field={field}
                            value={item[field.name]}
                            disabled={disabled}
                            onChange={(fieldName, value) => updateItem(index, fieldName, value)}
                        />
                    ))}

                    {rows.map((row, rowIndex) => (
                        <div className="form-row" key={rowIndex}>
                            {row.map((field) => (
                                <FormField
                                    key={field.name}
                                    field={field}
                                    value={item[field.name]}
                                    disabled={disabled}
                                    onChange={(fieldName, value) =>
                                        updateItem(index, fieldName, value)
                                    }
                                />
                            ))}
                        </div>
                    ))}
                </div>

                {!disabled && (
                    <button
                        type="button"
                        className="form-button form-button--danger"
                        onClick={() => removeItem(index)}
                    >
                        {removeLabel}
                    </button>
                )}

                {itemErrors.length > 0 && (
                    <div className="form-error">
                        {itemErrors.map((message, errorIndex) => (
                            <p key={errorIndex}>{message}</p>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="form-repeater">
            {value.map((item, index) =>
                collapsible ? (
                    <CollapsibleSection
                        key={index}
                        title={getTitle(item, index)}
                        defaultOpen={defaultOpen}
                    >
                        {renderItem(item, index)}
                    </CollapsibleSection>
                ) : (
                    <div key={index}>{renderItem(item, index)}</div>
                ),
            )}

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
