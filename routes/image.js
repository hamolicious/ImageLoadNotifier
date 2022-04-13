import { RequestTracker } from "../models/requesttracker.js";
import { ImageRequest } from "../models/request.js";
import { config } from "../models/configmanager.js";
import path from "path";

export default function EndPoint_Get_Image(req, res) {
    res.setHeader("Content-Type", "image/png");

    const id = req.params.id;
    if (RequestTracker.doesExist(id)) {
        if (config.ignoreFirstRequest && RequestTracker.getData(id).accessed == -1) {
            RequestTracker.getData(id).accessed++;
        } else {
            RequestTracker.getData(id).requests.push(
                new ImageRequest(req.headers["user-agent"])
            );
            RequestTracker.getData(id).accessed = RequestTracker.getData(id).requests.length;
        }
    }
    res.status(200).sendFile(path.join(process.cwd(), "assets/pixel.png"));
}