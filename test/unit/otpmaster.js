import { expect } from "chai";
import { otpMaster } from "../../models/otpmaster.js";

describe('OTPMaster', function() {
    describe("#setSecret", function() {
        it("sets the secret key", function() {
            otpMaster.setSecret("verysecure");
            expect(otpMaster._secret).to.equal("verysecure");
        });
        it("sets the secret key only once", function() {
            otpMaster.setSecret("verysecure");
            otpMaster.setSecret("verysecurex2");
            expect(otpMaster._secret).to.equal("verysecure");
        });
    });

    describe("#generateSecret", function() {
        it("generates the same length key everytime", function() {
            const key1 = otpMaster.generateSecret();
            const key2 = otpMaster.generateSecret();
            const key3 = otpMaster.generateSecret();
            const key4 = otpMaster.generateSecret();

            expect(key1.length).to.equal(103);
            expect(key2.length).to.equal(103);
            expect(key3.length).to.equal(103);
            expect(key4.length).to.equal(103);
        });
    });

    describe("#generateURI", function() {
        it("generates a google authenticator compatible link", function() {
            const uri = otpMaster.generateURI();

            expect(uri).to.equal(
                "otpauth://totp/Email%20Tracker:notanemail%40gmail.com?secret=verysecure&period=30&digits=6&algorithm=SHA1&issuer=Email%20Tracker"
            );
        });
    });
});