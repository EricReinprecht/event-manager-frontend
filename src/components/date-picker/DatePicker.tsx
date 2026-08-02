import ReactDatePicker from 'react-datepicker';
import { useTranslation } from 'react-i18next';

import { formatDate, parseDate } from './date.utils';

import 'react-datepicker/dist/react-datepicker.css';

import './date-picker.scss';

interface Props {
    value?: string;

    onChange(value: string): void;

    placeholder?: string;

    className?: string;

    ariaLabel?: string;
}

export default function DatePicker({
    value = '',
    onChange,
    placeholder,
    className,
    ariaLabel,
}: Props) {
    const { t } = useTranslation('entityForm');

    return (
        <div className="date-picker">
            <ReactDatePicker
                className={className}
                aria-label={ariaLabel}
                selected={parseDate(value)}
                onChange={(date: Date | null) => onChange(formatDate(date))}
                dateFormat="dd.MM.yyyy"
                placeholderText={placeholder ?? t('datepicker.selectDate')}
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
