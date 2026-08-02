import { X } from 'lucide-react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import 'react-datepicker/dist/react-datepicker.css';

import CategoryMultiSelect from '@/features/categories/hooks/components/CategoryMultiSelect';

import LocationPicker from '../fields/LocationPicker';
import Repeater from '../fields/Repeater';
import Checkbox from '../fields/Checkbox';
import SingleImageUpload from '../fields/SingleImageUpload';
import MultipleImageUpload from '../fields/MultipleImageUpload';
import type { FormFieldConfig } from './types';

interface Props {
    field: FormFieldConfig;
    value: any;
    onChange(name: string, value: any): void;
    disabled?: boolean;
    error?: string;
    fieldErrors?: Record<string, string>;
    repeaterDepth?: number;
    validationAttempt?: number;
    errorKey?: string;
    formValues?: Record<string, any>;
    itemValues?: Record<string, any>;
}

export default function FormField({
    field,
    value,
    onChange,
    disabled = false,
    error,
    fieldErrors = {},
    repeaterDepth = 0,
    validationAttempt = 0,
    errorKey,
    formValues = {},
    itemValues,
}: Props) {
    const { t } = useTranslation('entityForm');
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

    const dateBoundary = (boundary?: string) => {
        if (!boundary) return undefined;
        const [year, month, day] = boundary.split('T')[0].split('-').map(Number);
        return new Date(year, month - 1, day);
    };

    const timeBoundary = (boundary?: string) =>
        boundary ? new Date(`1970-01-01T${boundary}:00`) : undefined;

    const fieldDisabled =
        disabled || field.disabled || field.disabledWhen?.(formValues, itemValues);

    const minTimeValue = field.minTime?.(formValues, itemValues);
    const maxTimeValue = field.maxTime?.(formValues, itemValues);
    const timeRange =
        minTimeValue || maxTimeValue
            ? {
                  minTime: timeBoundary(minTimeValue ?? '00:00'),
                  maxTime: timeBoundary(maxTimeValue ?? '23:59'),
              }
            : {};

    return (
        <div className={`form-input ${inputClass}`} data-error-key={errorKey ?? field.name}>
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
                                    : field.type === 'date'
                                      ? (() => {
                                            const [year, month, day] = String(value)
                                                .split('T')[0]
                                                .split('-')
                                                .map(Number);
                                            return new Date(year, month - 1, day);
                                        })()
                                      : new Date(value)
                                : null
                        }
                        onChange={(date: Date | null) => {
                            if (field.type === 'time') {
                                onChange(field.name, date ? date.toTimeString().slice(0, 5) : '');
                                return;
                            }

                            if (field.type === 'date') {
                                const nextDate = date ? format(date, 'yyyy-MM-dd') : '';
                                onChange(field.name, nextDate);
                                if (!nextDate) {
                                    field.clearFieldsOnEmpty?.forEach((name) => onChange(name, ''));
                                }
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
                                ? t('datepicker.selectDateTime')
                                : field.type === 'time'
                                  ? t('datepicker.selectTime')
                                  : t('datepicker.selectDate')
                        }
                        className={`form-datepicker ${inputClass}`}
                        popperPlacement="bottom-start"
                        minDate={dateBoundary(field.minDate?.(formValues, itemValues))}
                        maxDate={dateBoundary(field.maxDate?.(formValues, itemValues))}
                        showMonthDropdown={field.showMonthDropdown}
                        showYearDropdown={field.showYearDropdown}
                        dropdownMode="select"
                        {...timeRange}
                        disabled={fieldDisabled}
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

            {field.type === 'media' &&
                (field.multiple ? (
                    <MultipleImageUpload
                        value={value}
                        accept={field.accept}
                        disabled={disabled || field.disabled}
                        onChange={(media) => onChange(field.name, media)}
                    />
                ) : (
                    <SingleImageUpload
                        value={value}
                        accept={field.accept}
                        disabled={disabled || field.disabled}
                        onChange={(media) => onChange(field.name, media)}
                    />
                ))}

            {field.type === 'repeater' && (
                <Repeater
                    name={field.name}
                    path={errorKey ?? field.name}
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
                    clearable={field.clearable}
                    clearLabel={field.clearLabel}
                    titleField={field.titleField}
                    titleFormatter={field.titleFormatter}
                    errors={fieldErrors}
                    depth={repeaterDepth}
                    validationAttempt={validationAttempt}
                    formValues={formValues}
                />
            )}

            {error && <p className="form-error">{error}</p>}
        </div>
    );
}
