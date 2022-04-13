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
    describe("GET /:id.png", () => {
        it("should return an image regardless of the id", (done) => {
            chai
                .request(app)
                .get("/aoufhasfhpasf.png")
                .end((err, res) => {
                    res.should.have.a.status(200);
                    done();
                });
        });
        it("should return an image regardless of the id", (done) => {
            chai
                .request(app)
                .get("/anything.png")
                .end((err, res) => {
                    res.should.have.a.status(200);
                    done();
                });
        });
    });
});