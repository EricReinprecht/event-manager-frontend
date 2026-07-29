import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import CategoryMultiSelect from '@/features/categories/hooks/components/CategoryMultiSelect';

import type { FormFieldConfig } from './types';

interface Props {
    field: FormFieldConfig;

    value: any;

    onChange(name: string, value: any): void;
}

export default function FormField({ field, value, onChange }: Props) {
    return (
        <div className="form-input">
            <label>{field.label}</label>

            {field.type === 'text' && (
                <input
                    type="text"
                    value={value ?? ''}
                    placeholder={field.placeholder}
                    required={field.required}
                    onChange={(e) => onChange(field.name, e.target.value)}
                />
            )}

            {field.type === 'textarea' && (
                <textarea
                    value={value ?? ''}
                    placeholder={field.placeholder}
                    required={field.required}
                    onChange={(e) => onChange(field.name, e.target.value)}
                />
            )}

            {field.type === 'select' && (
                <select value={value ?? ''} onChange={(e) => onChange(field.name, e.target.value)}>
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
                    />
                </div>
            )}

            {field.type === 'multiselect' && (
                <CategoryMultiSelect
                    value={value ?? []}
                    options={field.options ?? []}
                    onChange={(value) => onChange(field.name, value)}
                />
            )}
        </div>
    );
}
