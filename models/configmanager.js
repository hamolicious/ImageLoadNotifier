/* c8 ignore start*/
export const config = {
    disableTOTP: process.env.DISABLE_TOTP || false,
    port: process.env.PORT || 80,
    host: process.env.HOST || "127.0.0.1",
};

/* c8 ignore end*/