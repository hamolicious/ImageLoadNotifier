import { requestTracker } from "../models/requesttracker.js";
import { otpMaster } from "../models/otpmaster.js"
import path from "path";

function generateRandomString(length) {
    let result = "",
        seeds

    for (let i = 0; i < length - 1; i++) {
        seeds = [
            Math.floor(Math.random() * 25) + 65,
            Math.floor(Math.random() * 25) + 97
        ]
        result += String.fromCharCode(seeds[Math.floor(Math.random() * 2)])
    }

    return result
}

export default function generateKey(req, res) {
    res.setHeader("Content-Type", "application/json");

    if (!req.headers['otp']) {
        res.status(401).json({
            message: 'No OTP was provided'
        });
        res.end();
        return;
    }

    if (!otpMaster.validateOTP(req.headers["otp"], 'secret')) {
        res.status(401).json({
            message: "OTP was invalid",
        });
        res.end();
        return;
    }

    const userKey = generateRandomString(64);
    const imageURL = path
        .join(req.headers.host, userKey + ".png")
        .replaceAll("\\", "/");
    const dataURL = path
        .join(req.headers.host, '/get-key-data', userKey)
        .replaceAll("\\", "/");

    requestTracker.new(userKey);

    res.status(200).json({
        key: userKey,
        link: imageURL,
        data: dataURL,
        code: `<img src="${imageURL}">`,
    });
}