export default class LoggingManager {
    constructor(contextName) {
        this.name = contextName;
    }

    log(message) {
        console.log(`[${this.name}] ${message}`);
    }

    static register(context) {
        if (context.name)
            return new LoggingManager(context.name);

        return new LoggingManager(context);
    }
}