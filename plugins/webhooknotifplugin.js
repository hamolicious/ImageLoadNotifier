import { BasePlugin } from "../models/pluginmanager.js";
import fetch from "node-fetch";
import LoggingManager from "../models/loggingmanager.js";

export default class WebHookNotifier extends BasePlugin {
    description = "Forwards the data upon a request";

    static onRegister() {
        this.url = "http://localhost:3000";
        this.method = "POST";

        this.loadConfigs();
        this.logger.log("Looks all good");
    }

    static onLoad() {
        this.logger = LoggingManager.register(this);
    }

    static onNotify(data) {
        this.logger.log(`Sent data to ${this.url}`)
        const response = fetch(this.url, {
            method: "post",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        });
    }
}