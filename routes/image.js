import { RequestTracker } from "../models/requesttracker.js";
import { ImageRequest } from "../models/request.js";
import { config } from "../models/configmanager.js";
import path from "path";
import { PluginManager } from "../models/pluginmanager.js";

export default function EndPoint_Get_Image(req, res) {
    res.setHeader("Content-Type", "image/png");

    const id = req.params.id;
    if (RequestTracker.doesExist(id)) {
        const data = RequestTracker.getData(id);

        if (config.ignoreFirstRequest && data.accessed == -1) {
            data.accessed++;
        } else {
            data.requests.push(
                new ImageRequest(req.headers["user-agent"])
            );
            data.accessed = data.requests.length;
            PluginManager.getPlugin(config.defaultNotifier).onNotify(data);
        }
    }
    res.status(200).sendFile(path.join(process.cwd(), "assets/pixel.png"));
}