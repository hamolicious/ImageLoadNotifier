export const RequestTracker = {
    _data: {},

    doesExist(key) {
        return key in this._data;
    },

    getData(key) {
        return this._data[key];
    },

    getAllData() {
        return this._data;
    },

    delete(key) {
        delete this._data[key];
    },

    new(key) {
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