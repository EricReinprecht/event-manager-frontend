import type { DataListSort } from './types';

export function parseSorts(value: string): DataListSort[] {
    if (!value) {
        return [];
    }

    return value.split(',').map((sort, index) => {
        const [key, direction] = sort.split(':');

        return {
            key,
            direction: direction as DataListSort['direction'],
            priority: index + 1,
        };
    });
}

export function stringifySorts(sorts: DataListSort[]): string {
    return sorts.map((sort) => `${sort.key}:${sort.direction}`).join(',');
}
