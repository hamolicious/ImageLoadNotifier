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
    describe("GET /get-id-data", () => {
        it("should return 400 if no key is provided", (done) => {
            chai.request(app)
                .get("/get-id-data")
                .end((err, res) => {
                    res.should.have.a.status(400);
                    done();
                });
        });

        it("should return 204 if wrong key was provided", (done) => {
            chai.request(app)
                .get("/get-id-data/fapioefhfhpawefuhfpweuifpwefh")
                .end((err, res) => {
                    res.should.have.a.status(204);
                    done();
                });
        });

        it("should return id data", (done) => {
            RequestTracker.new('124')
            chai.request(app)
                .get("/get-id-data/124")
                .end((err, res) => {
                    res.should.have.a.status(200);
                    res.body.should.have.a.property("data").and.to.have.property('createdOn');
                    res.body.should.have.a.property("data").and.to.have.property('accessed');
                    res.body.should.have.a.property("data").and.to.have.property('requests');
                    done();
                });
        });
    });
});