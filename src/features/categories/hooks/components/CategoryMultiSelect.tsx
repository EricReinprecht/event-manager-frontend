import Select from 'react-select';

interface Props {
    value?: string[];

    options: {
        label: string;
        value: string;
    }[];

    onChange(value: string[]): void;

    disabled?: boolean;
}

export default function CategoryMultiSelect({
    value = [],
    options,
    onChange,
    disabled = false,
}: Props) {
    const selected = options.filter((option) => value.includes(option.value));

    return (
        <Select
            isMulti
            isSearchable={!disabled}

            isDisabled={disabled}

            options={options}

            value={selected}

            onChange={(items) => {
                if (disabled) return;

                onChange(items.map((item) => item.value));
            }}

            placeholder="Select categories..."
        />
    );
}
