export const ROUTES = {
    HOME: '/',

    // Auth
    LOGIN: '/login',

    FORGOT_PASSWORD: '/forgot-password',

    RESET_PASSWORD: '/reset-password',

    RESEND_VERIFICATION: '/resend-verification',

    REGISTER: '/register',

    VERIFY_EMAIL: '/verify-email',

    VERIFY_EMAIL_SENT: '/verify-email-sent',

    // User
    USER: '/user',

    COMPLETE_PROFILE: '/user/complete-profile',

    USER_DASHBOARD: '/user/dashboard',

    USER_PARTIES: '/user/parties',

    USER_PARTY_CREATE: '/user/create-party',

    USER_PARTY_EDIT: (id: string | number) => `/user/parties/${id}/edit`,

    USER_PARTY_VIEW: (id: string | number) => `/parties/${id}`,

    USER_TICKETS: '/user/tickets',

    USER_PURCHASES: '/user/purchases',

    USER_PROFILE: '/user/profile',

    // Fe
    DASHBOARD: '/dashboard',

    PARTIES: '/parties',
} as const;
