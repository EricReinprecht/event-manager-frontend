interface Props {
    checked?: boolean;

    disabled?: boolean;

    onChange(value: boolean): void;
}

export default function Checkbox({ checked = false, disabled = false, onChange }: Props) {
    return (
        <label className="form-checkbox">
            <input
                type="checkbox"
                checked={checked}
                disabled={disabled}
                onChange={(e) => onChange(e.target.checked)}
            />

            <span className="form-checkbox__box">
                <span className="form-checkbox__check">✓</span>
            </span>
        </label>
    );
}
