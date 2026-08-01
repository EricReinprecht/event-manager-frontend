export default function scrollToFirstError(errors: Record<string, string>) {
    const firstErrorKey = Object.keys(errors)[0];

    if (!firstErrorKey) {
        return;
    }

    const selector = `[data-error-key="${CSS.escape(firstErrorKey)}"]`;

    const target = document.querySelector<HTMLElement>(selector);

    if (!target) {
        return;
    }

    target.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
    });

    const focusable = target.matches('input, textarea, select, button')
        ? target
        : target.querySelector<HTMLElement>('input, textarea, select, button');

    focusable?.focus({
        preventScroll: true,
    });
}
