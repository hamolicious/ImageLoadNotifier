import LoggingManager from "./loggingmanager.js";

export const RequestTracker = {
    _data: {},
    logger: LoggingManager.register('RequestTracker'),

    doesExist(key) {
        return key in this._data;
    },

    getData(key) {
        this.logger.log('Data requested for ID: ' + key)
        return this._data[key];
    },

    getAllData() {
        this.logger.log("Data requested all ID's");
        return this._data;
    },

    delete(key) {
        this.logger.log("Deleting ID: " + key);
        delete this._data[key];
    },

    new(key) {
        this.logger.log("New ID generated: " + key);
        this._data[key] = {
            createdOn: new Date().getTime(),
            accessed: -1,
            requests: [],
        };
    },

    _purgeData() {
        this._data = {};
    },
};