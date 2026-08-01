interface Props {
    checked?: boolean;

    disabled?: boolean;

    error?: string;

    onChange(value: boolean): void;
}

export default function Checkbox({ checked = false, disabled = false, error, onChange }: Props) {
    return (
        <div className={`form-checkbox-wrapper ${error ? 'has-error' : ''}`}>
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

            {error && <p className="form-error">{error}</p>}
        </div>
    );
}
