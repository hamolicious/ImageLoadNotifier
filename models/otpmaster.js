import { authenticator } from "otplib";
import QRCode from "qrcode";

class OTPMaster {
    validateOTP(otp, secret) {
        return authenticator.check(otp, secret);
    }

    generateSecret() {
        return authenticator.generateSecret();
    }

    generateQRCode(secret) {
        //generate qr and put it in session
        return authenticator.keyuri(
            "notanemail@gmail.com",
            "Email Tracker",
            secret
        );
    }
}

export let otpMaster = new OTPMaster();