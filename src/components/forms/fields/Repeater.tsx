import FormField from '../entity/FormField';

import type { FormFieldConfig } from '../entity/types';

interface Props {
    value?: any[];

    fields: FormFieldConfig[];

    rows?: FormFieldConfig[][];

    onChange(value: any[]): void;

    disabled?: boolean;

    addLabel: string;

    removeLabel: string;

    itemLabel: string;
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

    return (
        <div className="form-repeater">
            {value.map((item, index) => (
                <div className="form-repeater__item" key={index}>
                    <div className="form-repeater__header">
                        <h3>
                            {itemLabel} {index + 1}
                        </h3>
                    </div>

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

                        {rows?.map((row, rowIndex) => (
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
            ))}

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
