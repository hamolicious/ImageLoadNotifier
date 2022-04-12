/* c8 ignore start*/
const toBool = (val) => val === "true" || val === "True";

export const config = {
    disableTOTP: toBool(process.env.DISABLE_TOTP) || false,
    keepQRCode: toBool(process.env.KEEP_QR_CODE) || false,
    port: process.env.PORT || 80,
    host: process.env.HOST || "127.0.0.1",
};

/* c8 ignore end*/