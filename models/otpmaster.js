import { authenticator } from "otplib";
import { writeFileSync } from "fs";
import QRCode from "qrcode";

class OTPMaster {
    constructor() {
        this._secret = "";
    }

    setSecret(secret) {
        if (this._secret === "") this._secret = secret;
    }

    /* c8 ignore start*/

    validateOTP(otp) {
        return authenticator.check(otp, this._secret);
    }

    generateSecretFile() {
        console.log("Creating file...");
        const secret = this.generateSecret();
        writeFileSync("secret.key", secret);
        this._secret = secret;
        console.log("Created file...");
    }

    generateQRCode() {
        QRCode.toFile("tempQRCode.png", this.generateURI(), function(err) {
            if (err) throw err;
        });
    }

    /* c8 ignore end */

    generateSecret() {
        return authenticator.generateSecret(64);
    }

    generateURI() {
        //generate qr and put it in session
        return authenticator.keyuri(
            "notanemail@gmail.com",
            "Email Tracker",
            this._secret
        );
    }
}

export let otpMaster = new OTPMaster();