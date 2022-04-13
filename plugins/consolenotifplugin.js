import { BasePlugin } from "../models/pluginmanager.js";
import { utcTimestampToCurrentTZTime } from "../util/time.js";

export default class ConsoleNotifier extends BasePlugin {
    description = 'Uses the STDOUT to notify of a request'

    static onLoad() {}
    static onRegister() {}

    static onNotify(data) {
        const time = utcTimestampToCurrentTZTime(data.requests[0].timestamp);
        console.log(`Image Was Accessed on ${time}`);
    }
}