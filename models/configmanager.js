/* c8 ignore start*/
const toBool = (val) => val === "true" || val === "True";

export const config = {
    disableTOTP: toBool(process.env.DISABLE_TOTP) || false,
    keepQRCode: toBool(process.env.KEEP_QR_CODE) || false,
    ignoreFirstRequest: toBool(process.env.IGNORE_FIRST_REQUEST) || true,
    clearLogsOnStart: toBool(process.env.CLEAR_LOGS_ON_START) || true,

    defaultNotifier: process.env.DEFAULT_NOTIFIER || "ConsoleNotifier",
    nodeEnv: process.env.NODE_ENV,
    logFilePath: process.env.LOG_FILE_PATH || "./logs/temp.log",

    port: process.env.PORT || 80,
    host: process.env.HOST || "127.0.0.1",
};

/* c8 ignore end*/