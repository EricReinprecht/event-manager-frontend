import { createContext, useContext, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

const UserPageHeaderTargetContext = createContext<HTMLElement | null>(null);

interface ProviderProps {
    target: HTMLElement | null;
    children: ReactNode;
}

export function UserPageHeaderTargetProvider({ target, children }: ProviderProps) {
    return (
        <UserPageHeaderTargetContext.Provider value={target}>
            {children}
        </UserPageHeaderTargetContext.Provider>
    );
}

interface Props {
    title: ReactNode;
    actions?: ReactNode;
}

export default function UserPageHeader({ title, actions }: Props) {
    const target = useContext(UserPageHeaderTargetContext);

    if (!target) return null;

    return createPortal(
        <>
            <h1>{title}</h1>
            {actions && <div className="user-layout__page-actions">{actions}</div>}
        </>,
        target,
    );
}
