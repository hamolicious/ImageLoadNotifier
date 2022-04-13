import { BasePlugin } from "../models/pluginmanager.js";

export default class ConsoleNotifier extends BasePlugin {
    description = 'Uses the STDOUT to notify of a request'

    static onLoad() {}
    static onRegister() {}

    static onNotify(data) {
        console.log(`Image Was Accessed @${data.requests[0].timestamp}`);
    }
}