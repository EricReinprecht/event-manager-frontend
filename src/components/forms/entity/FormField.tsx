import { X } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import CategoryMultiSelect from '@/features/categories/hooks/components/CategoryMultiSelect';

import type { FormFieldConfig } from './types';

import LocationPicker from '../fields/LocationPicker';
import Repeater from '../fields/Repeater';
import Checkbox from '../fields/Checkbox';

interface Props {
    field: FormFieldConfig;
    value: any;
    onChange(name: string, value: any): void;
    disabled?: boolean;
}

export default function FormField({ field, value, onChange, disabled = false }: Props) {
    if (field.type === 'hidden') {
        return (
            <input
                type="hidden"
                value={value ?? ''}
                onChange={(e) => onChange(field.name, e.target.value)}
            />
        );
    }

    const showClear =
        !disabled && !field.disabled && value !== undefined && value !== null && value !== '';

    const clearValue = () => {
        switch (field.type) {
            case 'number':
                onChange(field.name, undefined);
                break;

            default:
                onChange(field.name, '');
                break;
        }
    };

    return (
        <div className="form-input">
            <label>{field.label}</label>

            {field.type === 'text' && (
                <div className="form-input__wrapper">
                    <input
                        value={value ?? ''}
                        disabled={disabled || field.disabled}
                        onChange={(e) => onChange(field.name, e.target.value)}
                    />

                    {showClear && (
                        <button type="button" className="form-input__clear" onClick={clearValue}>
                            <X size={16} />
                        </button>
                    )}
                </div>
            )}

            {field.type === 'textarea' && (
                <div className="form-input__wrapper">
                    <textarea
                        value={value ?? ''}
                        placeholder={field.placeholder}
                        required={field.required}
                        disabled={disabled || field.disabled}
                        onChange={(e) => onChange(field.name, e.target.value)}
                    />

                    {showClear && (
                        <button
                            type="button"
                            className="form-input__clear form-input__clear--textarea"
                            onClick={clearValue}
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>
            )}

            {field.type === 'number' && (
                <div className="form-input__wrapper">
                    <input
                        type="number"
                        value={value ?? ''}
                        required={field.required}
                        disabled={disabled || field.disabled}
                        onChange={(e) =>
                            onChange(
                                field.name,
                                e.target.value === '' ? undefined : Number(e.target.value),
                            )
                        }
                    />

                    {showClear && (
                        <button type="button" className="form-input__clear" onClick={clearValue}>
                            <X size={16} />
                        </button>
                    )}
                </div>
            )}

            {field.type === 'select' && (
                <select
                    value={value ?? ''}
                    disabled={disabled || field.disabled}
                    onChange={(e) => onChange(field.name, e.target.value)}
                >
                    <option value="">Select...</option>

                    {field.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            )}

            {field.type === 'date' && (
                <div className="form-input__wrapper">
                    <DatePicker
                        selected={value ? new Date(value) : null}
                        onChange={(date: Date | null) =>
                            onChange(field.name, date?.toISOString() ?? '')
                        }
                        dateFormat="dd.MM.yyyy"
                        placeholderText="Select date"
                        className="form-datepicker"
                        disabled={disabled || field.disabled}
                    />

                    {showClear && (
                        <button type="button" className="form-input__clear" onClick={clearValue}>
                            <X size={16} />
                        </button>
                    )}
                </div>
            )}

            {field.type === 'time' && (
                <div className="form-input__wrapper">
                    <DatePicker
                        selected={value ? new Date(`1970-01-01T${value}`) : null}
                        onChange={(date: Date | null) =>
                            onChange(field.name, date ? date.toTimeString().slice(0, 5) : '')
                        }
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeFormat="HH:mm"
                        dateFormat="HH:mm"
                        placeholderText="Select time"
                        className="form-datepicker"
                        disabled={disabled || field.disabled}
                    />

                    {showClear && (
                        <button type="button" className="form-input__clear" onClick={clearValue}>
                            <X size={16} />
                        </button>
                    )}
                </div>
            )}
            {field.type === 'datetime' && (
                <div className="form-input__wrapper">
                    <DatePicker
                        selected={value ? new Date(value) : null}
                        onChange={(date: Date | null) =>
                            onChange(field.name, date?.toISOString() ?? '')
                        }
                        showTimeSelect
                        timeIntervals={15}
                        dateFormat="dd.MM.yyyy HH:mm"
                        placeholderText="Select date and time"
                        className="form-datepicker"
                        popperPlacement="bottom-start"
                        disabled={disabled || field.disabled}
                    />

                    {showClear && (
                        <button type="button" className="form-input__clear" onClick={clearValue}>
                            <X size={16} />
                        </button>
                    )}
                </div>
            )}

            {field.type === 'multiselect' && (
                <CategoryMultiSelect
                    value={value ?? []}
                    options={field.options ?? []}
                    disabled={disabled || field.disabled}
                    onChange={(value) => onChange(field.name, value)}
                />
            )}

            {field.type === 'location' && (
                <LocationPicker
                    value={value}
                    disabled={disabled}
                    onChange={(location) => {
                        if (disabled) return;

                        onChange('location', location);
                    }}
                />
            )}

            {field.type === 'checkbox' && (
                <Checkbox
                    checked={value ?? false}
                    disabled={disabled || field.disabled}
                    onChange={(checked) => onChange(field.name, checked)}
                />
            )}

            {field.type === 'repeater' && (
                <Repeater
                    value={value ?? []}
                    fields={field.fields ?? []}
                    rows={field.rows ?? []}
                    addLabel={field.addLabel ?? 'Add'}
                    removeLabel={field.removeLabel ?? 'Remove'}
                    itemLabel={field.itemLabel ?? 'Item'}
                    disabled={disabled || field.disabled}
                    onChange={(items) => onChange(field.name, items)}
                    collapsible={field.collapsible}
                    defaultOpen={field.defaultOpen}
                    titleField={field.titleField}
                    titleFormatter={field.titleFormatter}
                />
            )}
        </div>
    );
}
