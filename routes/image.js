import { requestTracker } from "../models/requesttracker.js";
import path from "path";

export default function EndPoint_Get_Image(req, res) {
    res.setHeader("Content-Type", "image/png");

    if (requestTracker.doesExist(req.params.id)) {
        requestTracker.getData(req.params.id).accessedOn = new Date().getTime();
    }
    res.status(200).sendFile(path.join(process.cwd(), "assets/pixel.png"));
}