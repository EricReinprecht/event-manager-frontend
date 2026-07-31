import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface Props {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

export default function CollapsibleSection({ title, children, defaultOpen = true }: Props) {
    const [open, setOpen] = useState(defaultOpen);

    return (
        <div className="form-section form-section--collapsible">
            <button
                type="button"
                className="form-section__header"
                onClick={() => setOpen((prev) => !prev)}
            >
                <span>{title}</span>

                <ChevronDown size={18} className={open ? 'is-open' : ''} />
            </button>

            {open && <div className="form-section__body">{children}</div>}
        </div>
    );
}
