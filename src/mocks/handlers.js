import { http, HttpResponse } from 'msw';
// Mock handlers will be added as features are developed
export const handlers = [
    http.get('/api/health', () => {
        return HttpResponse.json({ status: 'ok' });
    }),
];
