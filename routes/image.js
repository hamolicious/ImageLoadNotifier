import { RequestTracker } from "../models/requesttracker.js";
import path from "path";

export default function EndPoint_Get_Image(req, res) {
    res.setHeader("Content-Type", "image/png");

    if (RequestTracker.doesExist(req.params.id)) {
        RequestTracker.getData(req.params.id).accessedOn = new Date().getTime();
    }
    res.status(200).sendFile(path.join(process.cwd(), "assets/pixel.png"));
}