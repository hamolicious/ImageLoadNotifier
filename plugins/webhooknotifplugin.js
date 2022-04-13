import { BasePlugin } from "../models/pluginmanager.js";
import fetch from "node-fetch";

export default class WebHookNotifier extends BasePlugin {
    description = "Forwards the data upon a request";

    static onLoad() {}
    static onRegister() {
        this.url = "http://localhost:3000";
        this.method = 'POST';

        this.loadConfigs();
    }

    static onNotify(data) {
        const response = fetch(this.url, {
            method: "post",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        });
    }
}