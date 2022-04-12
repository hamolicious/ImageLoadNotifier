class RequestTracker {
    constructor() {
        this._data = {}
    }

    doesExist(key) {
        return key in this._data;
    }

    getData(key) {
        return this._data[key];
    }

    delete(key) {
        delete this._data[key];
    }

    new(key) {
        this._data[key] = {
            createdOn: new Date().getTime(),
            accessedOn: false
        }
    }
}

export let requestTracker = new RequestTracker;