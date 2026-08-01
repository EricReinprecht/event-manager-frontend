import Select from 'react-select';

interface Props {
    value?: string[];

    options: {
        label: string;
        value: string;
    }[];

    onChange(value: string[]): void;

    disabled?: boolean;

    error?: string;
}

export default function CategoryMultiSelect({
    value = [],
    options,
    onChange,
    disabled = false,
    error,
}: Props) {
    const selected = options.filter((option) => value.includes(option.value));

    return (
        <div className={`form-multiselect ${error ? 'has-error' : ''}`}>
            <Select
                classNamePrefix="select"
                isMulti
                isSearchable={!disabled}
                isDisabled={disabled}
                options={options}
                value={selected}
                onChange={(items) => {
                    if (disabled) {
                        return;
                    }

                    onChange(items.map((item) => item.value));
                }}
                placeholder="Select categories..."
            />

            {error && <p className="form-error">{error}</p>}
        </div>
    );
}
