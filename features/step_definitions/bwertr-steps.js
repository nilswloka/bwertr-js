var bwertrSteps = function bwertrSteps() {
    'use strict';

    var request = require('request'),
        webdriver = require('../../lib/webdriver');

    this.Given(/^there are (\d+) ratings$/, function (numberOfRatings, callback) {
        request({
            uri: 'http://localhost:3000/ratings',
            method: 'DELETE'
        }, function () {
            if (numberOfRatings == 0) {
                callback();
            } else {
                var ratings = 0,
                    count;
                for (count = 0; count < numberOfRatings; count++) {
                    request({
                        uri: 'http://localhost:3000/ratings',
                        method: 'POST',
                        json: {rating: 0}
                    }, function () {
                        if (++ratings == numberOfRatings) {
                            callback();
                        }
                    });
                }
            }
        });
    });

    this.When(/^I visit the application$/, function (callback) {
        this.driver.get('http://localhost:3000/');
        this.driver.getTitle().then(function (title) {
            title == 'Welcome to bwertr!' ? callback() : callback.fail(new Error('Not on welcome page (title: ' + title + ')'))
        });
    });

    this.When(/^I rate with "([^"]*)"$/, function (rating, callback) {
        this.driver.findElement(By.xpath('//select/option[text()="' + rating + '"]')).click().then(callback);
    });

    this.Then(/^I can see that there are (\d+) ratings\.$/, function (expectedNumberOfRatings, callback) {
        this.driver.findElement(By.id('numberOfRatings')).getText().then(function (numberOfRatings) {
            numberOfRatings == expectedNumberOfRatings ? callback() : callback.fail(new Error('Expected ' + expectedNumberOfRatings + ', found ' + numberOfRatings));
        });
    });

    this.Then(/^I can see that I have rated with "([^"]*)"$/, function (expectedRating, callback) {
        this.driver.findElement(By.id('givenRating')).getText().then(function (givenRating) {
            givenRating == expectedRating ? callback() :  callback.fail(new Error('Expected ' + expectedRating + ', found ' + givenRating));
        });
    });

};

module.exports = bwertrSteps;