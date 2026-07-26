import { api } from '@api/client';

import type { RegisterRequest } from '../types';

export function register(data: RegisterRequest) {
    return api.post('/auth/register', data);
}
