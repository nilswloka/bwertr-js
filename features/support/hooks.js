var bwertrHooks = function () {
    var phantom = require('node-phantom');

    this.Before(function (callback) {
        self = this;
        phantom.create(function (err, ph) {
            self.phantom = ph;
            ph.createPage(function (err, page) {
                self.page = page;
                callback();
            })
        });
    });

    this.After(function (callback) {
        this.phantom.exit();
        callback();
    });
};

module.exports = bwertrHooks;