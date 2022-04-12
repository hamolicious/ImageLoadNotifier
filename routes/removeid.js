import { requestTracker } from "../models/requesttracker.js";
import path from "path";
import { otpMaster } from "../models/otpmaster.js";

export default function EndPoint_Delete_removeID(req, res) {
    res.setHeader("Content-Type", "application/json");

    if (!req.headers["otp"]) {
        res.status(401).json({
            message: "No OTP was provided",
        });
        res.end();
        return;
    }

    if (!otpMaster.validateOTP(req.headers["otp"], "secret")) {
        res.status(401).json({
            message: "OTP was invalid",
        });
        res.end();
        return;
    }

    requestTracker.delete(req.params.id);

    res.status(204);
    res.end();
}