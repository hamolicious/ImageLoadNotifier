// Import the dependencies for testing
import chai from "chai";
import chaiHttp from "chai-http";
import { app, server } from "../../index.js";
import { config } from "../../models/configmanager.js";
import { OTPMaster } from "../../models/otpmaster.js";
import { RequestTracker } from "../../models/requesttracker.js";

// Configure chai
chai.use(chaiHttp);
chai.should();

beforeEach(function() {
    config.disableTOTP = true;
    RequestTracker._purgeData();
    OTPMaster._purgeData();
});

after(function() {
    server.close();
});

describe("ImageLoadNotifier", () => {
    describe("GET /get-qr-code", () => {
        it("should return an image", (done) => {
            chai
                .request(app)
                .get("/get-qr-code")
                .end((err, res) => {
                    res.should.have.a.status(200);
                    done();
                });
        });
        it("should return an image only once", (done) => {
            chai
                .request(app)
                .get("/get-qr-code")
                .end((err, res) => {
                    res.should.have.a.status(404);
                    done();
                });
        });
    });
});