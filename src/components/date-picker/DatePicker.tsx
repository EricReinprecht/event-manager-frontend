import ReactDatePicker from 'react-datepicker';

import { formatDate, parseDate } from './date.utils';

import 'react-datepicker/dist/react-datepicker.css';

import './date-picker.scss';

interface Props {
    value?: string;

    onChange(value: string): void;

    placeholder?: string;

    className?: string;
}

export default function DatePicker({
    value = '',
    onChange,
    placeholder = 'Select date',
    className,
}: Props) {
    return (
        <div className="date-picker">
            <ReactDatePicker
                className={className}
                selected={parseDate(value)}
                onChange={(date: Date | null) => onChange(formatDate(date))}
                dateFormat="dd.MM.yyyy"
                placeholderText={placeholder}
                isClearable={false}
            />

            {value && (
                <button type="button" className="date-picker__clear" onClick={() => onChange('')}>
                    ×
                </button>
            )}
        </div>
    );
}
