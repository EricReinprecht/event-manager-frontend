import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import CategoryMultiSelect from '@/features/categories/hooks/components/CategoryMultiSelect';

import type { FormFieldConfig } from './types';

import LocationPicker from '../fields/LocationPicker';

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

    return (
        <div className="form-input">
            <label>{field.label}</label>

            {field.type === 'text' && (
                <input
                    type="text"
                    value={value ?? ''}
                    placeholder={field.placeholder}
                    required={field.required}
                    disabled={disabled}
                    onChange={(e) => onChange(field.name, e.target.value)}
                />
            )}

            {field.type === 'textarea' && (
                <textarea
                    value={value ?? ''}
                    placeholder={field.placeholder}
                    required={field.required}
                    disabled={disabled}
                    onChange={(e) => onChange(field.name, e.target.value)}
                />
            )}

            {field.type === 'select' && (
                <select
                    value={value ?? ''}
                    disabled={disabled}
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

            {field.type === 'datetime' && (
                <div className="form-datepicker-wrapper">
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
                        disabled={disabled}
                    />
                </div>
            )}

            {field.type === 'multiselect' && (
                <CategoryMultiSelect
                    value={value ?? []}
                    options={field.options ?? []}
                    disabled={disabled}
                    onChange={(value) => onChange(field.name, value)}
                />
            )}

            {field.type === 'location' && (
                <LocationPicker
                    value={value}
                    disabled={disabled}
                    onChange={(location) => {
                        if (disabled) return;

                        onChange('locationName', location.locationName);
                        onChange('latitude', location.latitude);
                        onChange('longitude', location.longitude);
                        onChange('timezone', location.timezone);
                    }}
                />
            )}
        </div>
    );
}
