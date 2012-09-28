var bwertrHooks = function () {
    var webdriver = require('../../lib/webdriver');

    this.Before(function (callback) {
        this.webdriver = webdriver;
        this.driver = new webdriver.Builder().
            usingServer('http://localhost:4444/wd/hub').
            withCapabilities({
                'browserName': 'firefox',
                'javascriptEnabled': 'true'
            }).
            build();
        callback();
    });

    this.After(function (callback) {
        this.driver.quit().then(function () {
            callback();
        });
    });
};

module.exports = bwertrHooks;