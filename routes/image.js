import { requestTracker } from "../models/requesttracker.js";
import path from "path";

export default function image(req, res) {
    if (requestTracker.doesExist(req.params.id)) {
        requestTracker.getData(req.params.id).accessedOn = new Date().getTime();
    }
    res.status(200).sendFile(path.join(process.cwd(), "assets/pixel.png"));
}