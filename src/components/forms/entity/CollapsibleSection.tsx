import { ChevronDown } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';

interface Props {
    title: string;

    children: ReactNode;

    defaultOpen?: boolean;

    forceOpen?: boolean;

    forceOpenKey?: number;
}

export default function CollapsibleSection({
    title,
    children,
    defaultOpen = false,
    forceOpen = false,
    forceOpenKey = 0,
}: Props) {
    const [isOpen, setIsOpen] = useState(defaultOpen || forceOpen);

    useEffect(() => {
        if (forceOpen) {
            setIsOpen(true);
        }
    }, [forceOpen, forceOpenKey]);

    return (
        <section className="form-section form-section--collapsible">
            <button
                type="button"
                className="form-section__header"
                onClick={() => setIsOpen((current) => !current)}
            >
                <span>{title}</span>

                <ChevronDown className={isOpen ? 'is-open' : ''} />
            </button>

            {isOpen && <div className="form-section__body">{children}</div>}
        </section>
    );
}
