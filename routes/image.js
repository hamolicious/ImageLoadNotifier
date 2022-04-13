import { RequestTracker } from "../models/requesttracker.js";
import { ImageRequest } from "../models/request.js";
import path from "path";

export default function EndPoint_Get_Image(req, res) {
    res.setHeader("Content-Type", "image/png");

    if (RequestTracker.doesExist(req.params.id)) {
        RequestTracker.getData(req.params.id).requests.push(
            new ImageRequest(req.headers["user-agent"])
        );
    }
    res.status(200).sendFile(path.join(process.cwd(), "assets/pixel.png"));
}