import { authenticator } from "otplib";
import { writeFileSync } from "fs";
import QRCode from "qrcode";
import { config } from "./configmanager.js";
import LoggingManager from "./loggingmanager.js";

export const OTPMaster = {
    _secret: "",
    logger: LoggingManager.register('OTP'),

    setSecret(secret) {
        /* c8 ignore next 1*/
        if (this._secret === "") this._secret = secret;
    },

    /* c8 ignore start*/

    validateOTP(otp) {
        if (config.disableTOTP) return true
        return authenticator.check(otp, this._secret);
    },

    generateSecretFile() {
        this.logger.log("Creating file...");
        const secret = this.generateSecret();
        writeFileSync("secret.key", secret);
        this._secret = secret;
        this.logger.log("Created file...");
    },

    generateQRCode() {
        QRCode.toFile("tempQRCode.png", this.generateURI(), function(err) {
            if (err) throw err;
        });
    },

    /* c8 ignore end */

    generateSecret() {
        return authenticator.generateSecret(64);
    },

    generateURI() {
        //generate qr and put it in session
        return authenticator.keyuri(
            "notanemail@gmail.com",
            "Email Tracker",
            this._secret
        );
    },

    _purgeData() {
        this._secret = "";
    },

}