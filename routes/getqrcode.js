import { RequestTracker } from "../models/requesttracker.js";
import path from "path";
import { existsSync, rmSync } from "fs";
import { config } from "../models/configmanager.js";

let hasBeenCalled = false;

export default function EndPoint_Get_QRCode(req, res) {
    res.setHeader("Content-Type", "image/png");

    const filename = "tempQRCode.png";

    if (!hasBeenCalled) {
        res.status(200).sendFile(path.join(process.cwd(), filename));
        if (config.keepQRCode == false) {
            hasBeenCalled = true;
        }
        return;
    }

    res.status(404);
    res.end();

}