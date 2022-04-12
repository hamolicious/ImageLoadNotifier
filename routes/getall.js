import { OTPMaster } from "../models/otpmaster.js";
import { RequestTracker } from "../models/requesttracker.js";

export default function EndPoint_Get_All(req, res) {
    res.setHeader("Content-Type", "application/json");

    if (!req.headers["otp"]) {
        res.status(401).json({
            message: "No OTP was provided",
        });
        res.end();
        return;
    }

    if (!OTPMaster.validateOTP(req.headers["otp"], "secret")) {
        res.status(401).json({
            message: "OTP was invalid",
        });
        res.end();
        return;
    }


    res.status(200).json(RequestTracker.getAllData());
}