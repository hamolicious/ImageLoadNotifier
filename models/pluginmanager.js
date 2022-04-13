import { readdirSync, readFileSync } from 'fs';
import path from 'path';

const isPrototypeOf = Function.call.bind(Object.prototype.isPrototypeOf);

export class BasePlugin {
    description = "Default Plugin";

    static loadConfigs() {
        console.log(process.cwd());
        const rawdata = readFileSync(`./plugins/configs/${this.name}.json`);
        const pluginConfig = JSON.parse(rawdata);

        for (let key in pluginConfig) {
            this[key] = pluginConfig[key];
        }
    }

    static onRegister() {
        throw new Error("#onRegister() Not Implemented");
    }

    static onLoad() {
        throw new Error("#onLoad() Not Implemented");
    }

    static onNotify(data) {
        throw new Error("#onNotify() Not Implemented");
    }
}

export const PluginManager = {
    _plugins: {},

    getPlugin(name) {
        return this._plugins[name];
    },

    getAllPlugins() {
        return this._plugins;
    },

    register(plugin) {
        if (!isPrototypeOf(BasePlugin, plugin))
            throw new Error("Plugin not of type `BasePlugin`");
        this._plugins[plugin.name] = plugin;
        plugin.onRegister();
        return true;
    },

    unregister(plugin) {
        delete this._plugins[plugin.name];
    },

    discoverPlugins() {
        return readdirSync("plugins", { withFileTypes: true })
            .filter((item) => !item.isDirectory())
            .map((item) => item.name);
    },

    loadAllPlugins(plugins) {
        for (let index in plugins) {
            this.loadPlugin(plugins[index]);
        }
    },

    loadPlugin(plugin) {
        const modulePath = "file:\\\\" + path.resolve(path.join("plugins", plugin));
        import (modulePath).then(function(value) {
            value.default.onLoad();
            PluginManager.register(value.default);
            console.log(`Plugin ${value.default.name} has been loaded`);
        });
    },
};