var BwertrDriver = require('./bwertr-driver');

var bwertrHooks = function () {

    this.Before(function (callback) {
        this.bwertrDriver = new BwertrDriver.BwertrDriver();
        callback();
    });

    this.After(function (callback) {
        this.bwertrDriver.quit(callback);
    });
};

module.exports = bwertrHooks;