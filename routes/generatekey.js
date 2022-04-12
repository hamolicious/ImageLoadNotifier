import { requestTracker } from "../models/requesttracker.js";
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
    const userKey = generateRandomString(64);

    const imageURL = path
        .join(req.headers.host, userKey + ".png")
        .replaceAll("\\", "/");

    requestTracker.new(userKey);

    res.render("generatekey", {
        key: userKey,
        link: imageURL,
        code: `<img src="${imageURL}">`,
    });
}