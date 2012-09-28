var webdriver = require('../../lib/webdriver');

var BwertrDriver = function BwertrDriver() {

    this.driver = new webdriver.Builder().
        usingServer('http://localhost:4444/wd/hub').
        withCapabilities({
            'browserName': 'firefox',
            'javascriptEnabled': 'true'
        }).
        build();

    this.visitBwertr = function () {
        return this.driver.get('http://localhost:3000/');
    };

    this.rateWith = function (rating, callback) {
        this.visitBwertr();
        this.driver.findElement(By.xpath('//select/option[text()="' + rating + '"]')).click();
        this.driver.findElement(By.id('submit')).click().then(callback);
    };

    this.numberOfRatingsShown = function (callback) {
        this.driver.findElement(By.id('numberOfRatings')).getText().then(callback);
    };

    this.ratingShown = function (callback) {
        this.driver.findElement(By.id('givenRating')).getText().then(callback);
    };

    this.quit = function (callback) {
        this.driver.quit().then(function () {
            callback();
        });
    };

};

exports.BwertrDriver = BwertrDriver;