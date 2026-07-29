import Select from 'react-select';

interface Props {
    value?: string[];

    options: {
        label: string;
        value: string;
    }[];

    onChange(value: string[]): void;
}

export default function CategoryMultiSelect({ value = [], options, onChange }: Props) {
    const selected = options.filter((option) => value.includes(option.value));

    return (
        <Select
            isMulti

            isSearchable

            options={options}

            value={selected}

            onChange={(items) => onChange(items.map((item) => item.value))}

            placeholder="Select categories..."
        />
    );
}
