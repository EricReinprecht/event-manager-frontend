import routes from '@/constants/routes';

export function route(path: string, params: Record<string, string | number>) {
    return Object.entries(params).reduce(
        (result, [key, value]) => result.replace(`:${key}`, String(value)),
        path,
    );
}

export default routes;
