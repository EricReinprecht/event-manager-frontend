import FormField from '../entity/FormField';
import type { FormFieldConfig } from '../entity/types';
import CollapsibleSection from '../entity/CollapsibleSection';

interface Props {
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
}

export default function Repeater({
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
}: Props) {
    function addItem() {
        onChange([...value, {}]);
    }

    function removeItem(index: number) {
        onChange(value.filter((_, itemIndex) => itemIndex !== index));
    }

    function updateItem(index: number, name: string, newValue: unknown) {
        const items = [...value];

        items[index] = {
            ...items[index],
            [name]: newValue,
        };

        onChange(items);
    }

    function renderItem(item: any, index: number) {
        return (
            <div className="form-repeater__item">
                <div className="form-repeater__fields">
                    {fields.length > 0 &&
                        fields.map((field) => (
                            <FormField
                                key={field.name}
                                field={field}
                                value={item[field.name]}
                                disabled={disabled}
                                onChange={(name, value) => updateItem(index, name, value)}
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
                                    onChange={(name, value) => updateItem(index, name, value)}
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
            </div>
        );
    }

    return (
        <div className="form-repeater">
            {value.map((item, index) =>
                collapsible ? (
                    <CollapsibleSection
                        key={index}
                        title={`${itemLabel} ${index + 1}`}
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
