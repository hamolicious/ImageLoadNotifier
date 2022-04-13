import { appendFileSync, truncate } from "fs";
import { config } from "./configmanager.js";

const logStack = [];

export default class LoggingManager {
    //#region Instance
    constructor(contextName) {
        this.name = contextName;
    }

    log(message) {
        const output = `[${this.name}] ${message}`;
        logStack.push(output);
        console.log(output);
        fileLogger(config.logFilePath);
    }

    //#endregion Instance

    static setup() {
        if (config.clearLogsOnStart) {
            console.log("[LoggingManager] Clearing log file...");
            truncate(config.logFilePath, 0, function(err) {
                if (err)
                    throw err
                console.log("[LoggingManager] Done clearing log file");
            });
        }
    }

    static register(context) {
        if (context.name) return new LoggingManager(context.name);
        return new LoggingManager(context);
    }
}

async function fileLogger(logFilePath) {
    while (logStack.length > 0) {
        appendFileSync(logFilePath, logStack.pop() + '\n');
    }
}