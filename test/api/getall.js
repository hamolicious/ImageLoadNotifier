// Import the dependencies for testing
import chai, { expect } from "chai";
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
    describe("GET /get-all", () => {
        it("should be empty", (done) => {
            chai.request(app)
                .get("/get-all")
                .set({ 'otp': 1234 })
                .end((err, res) => {
                    res.should.have.a.status(200);
                    res.body.should.be.a("object");
                    expect(res.body).to.be.empty;
                    done();
                });
        });

        it("should return 401 if no otp was given", (done) => {
            chai.request(app)
                .get("/get-all")
                .end((err, res) => {
                    res.should.have.a.status(401);
                    res.body.should.have.a.property("message");
                    done();
                });
        });

        it("should return 401 if wrong otp was given", (done) => {
            config.disableTOTP = false;
            chai
                .request(app)
                .get("/get-all")
                .end((err, res) => {
                    res.should.have.a.status(401);
                    res.body.should.have.a.property("message");
                    done();
                });
        });
    });
});