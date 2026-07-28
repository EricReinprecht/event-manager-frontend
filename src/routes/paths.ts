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

    USER_PARTIES: '/user/parties',

    COMPLETE_PROFILE: '/user/complete-profile',

    USER_DASHBOARD: '/user/dashboard',

    // Fe
    DASHBOARD: '/dashboard',

    PARTIES: '/parties',
} as const;
