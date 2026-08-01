import { X } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import CategoryMultiSelect from '@/features/categories/hooks/components/CategoryMultiSelect';

import LocationPicker from '../fields/LocationPicker';
import Repeater from '../fields/Repeater';
import Checkbox from '../fields/Checkbox';
import type { FormFieldConfig } from './types';

interface Props {
    field: FormFieldConfig;
    value: any;
    onChange(name: string, value: any): void;
    disabled?: boolean;
    error?: string;
    fieldErrors?: Record<string, string>;
}

export default function FormField({
    field,
    value,
    onChange,
    disabled = false,
    error,
    fieldErrors = {},
}: Props) {
    if (field.type === 'hidden') {
        return (
            <input
                type="hidden"
                value={value ?? ''}
                onChange={(e) => onChange(field.name, e.target.value)}
            />
        );
    }

    const inputClass = error ? 'has-error' : '';

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
        <div className={`form-input ${inputClass}`}>
            <label>{field.label}</label>

            {field.type === 'text' && (
                <div className="form-input__wrapper">
                    <input
                        className={inputClass}
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
                        className={inputClass}
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
                        className={inputClass}
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
                    className={inputClass}
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

            {(field.type === 'date' || field.type === 'time' || field.type === 'datetime') && (
                <div className="form-input__wrapper">
                    <DatePicker
                        selected={
                            value
                                ? field.type === 'time'
                                    ? new Date(`1970-01-01T${value}`)
                                    : new Date(value)
                                : null
                        }
                        onChange={(date: Date | null) => {
                            if (field.type === 'time') {
                                onChange(field.name, date ? date.toTimeString().slice(0, 5) : '');
                                return;
                            }

                            onChange(field.name, date?.toISOString() ?? '');
                        }}
                        showTimeSelect={field.type !== 'date'}
                        showTimeSelectOnly={field.type === 'time'}
                        timeIntervals={15}
                        timeFormat="HH:mm"
                        dateFormat={
                            field.type === 'datetime'
                                ? 'dd.MM.yyyy HH:mm'
                                : field.type === 'time'
                                  ? 'HH:mm'
                                  : 'dd.MM.yyyy'
                        }
                        placeholderText={
                            field.type === 'datetime'
                                ? 'Select date and time'
                                : field.type === 'time'
                                  ? 'Select time'
                                  : 'Select date'
                        }
                        className={`form-datepicker ${inputClass}`}
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
                    error={error}
                    onChange={(value) => onChange(field.name, value)}
                />
            )}

            {field.type === 'location' && (
                <LocationPicker
                    value={value}
                    disabled={disabled}
                    error={error}
                    onChange={(location) => {
                        if (disabled) return;

                        onChange(field.name, location);
                    }}
                />
            )}

            {field.type === 'checkbox' && (
                <Checkbox
                    checked={value ?? false}
                    disabled={disabled || field.disabled}
                    error={error}
                    onChange={(checked) => onChange(field.name, checked)}
                />
            )}

            {field.type === 'repeater' && (
                <Repeater
                    name={field.name}
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
                    errors={fieldErrors}
                />
            )}

            {error && <p className="form-error">{error}</p>}
        </div>
    );
}
