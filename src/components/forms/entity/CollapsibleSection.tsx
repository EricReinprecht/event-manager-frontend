import { ChevronDown } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';

interface Props {
    title: string;

    children: ReactNode;

    defaultOpen?: boolean;

    forceOpen?: boolean;

    forceOpenKey?: number;

    errorCount?: number;

    variant?: 'section' | 'repeater';
}

export default function CollapsibleSection({
    title,
    children,
    defaultOpen = false,
    forceOpen = false,
    forceOpenKey = 0,
    errorCount = 0,
    variant = 'section',
}: Props) {
    const [isOpen, setIsOpen] = useState(defaultOpen || forceOpen);

    useEffect(() => {
        if (forceOpen) {
            setIsOpen(true);
        }
    }, [forceOpen, forceOpenKey]);

    const className = [
        'form-section',
        'form-section--collapsible',
        `form-section--${variant}`,
        errorCount > 0 ? 'form-section--has-errors' : '',
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <section className={className}>
            <button
                type="button"
                className="form-section__header"
                onClick={() => setIsOpen((current) => !current)}
            >
                <div className="form-section__header-content">
                    <span>{title}</span>

                    {errorCount > 0 && (
                        <span className="form-section__error-badge">{errorCount}</span>
                    )}
                </div>

                <ChevronDown className={isOpen ? 'is-open' : ''} />
            </button>

            {isOpen && <div className="form-section__body">{children}</div>}
        </section>
    );
}
