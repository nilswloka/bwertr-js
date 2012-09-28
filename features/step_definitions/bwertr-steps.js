var bwertrSteps = function bwertrSteps() {
    'use strict';

    var request = require('request'),
        webdriver = require('../../lib/webdriver');

    this.Given(/^there are (\d+) ratings$/, function (numberOfRatings, callback) {
        var self = this;
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
                    self.bwertrDriver.rateWith('Average', function () {
                        if (++ratings == numberOfRatings) {
                            callback();
                        }
                    });
                }
            }
        });
    });

    this.When(/^I visit the application$/, function (callback) {
        this.bwertrDriver.visitBwertr().then(callback);
    });

    this.When(/^I rate with "([^"]*)"$/, function (rating, callback) {
        this.bwertrDriver.rateWith(rating, callback);

    });

    this.Then(/^I can see that there are (\d+) ratings\.$/, function (expected, callback) {
        this.bwertrDriver.numberOfRatingsShown(function (numberOfRatings) {
            numberOfRatings == expected ? callback() : callback.fail(new Error('Expected ' + expected + ', found ' + numberOfRatings));
        });
    });

    this.Then(/^I can see that I have rated with "([^"]*)"$/, function (expected, callback) {
        this.bwertrDriver.ratingShown(function (ratingShown) {
            ratingShown == expected ? callback() :  callback.fail(new Error('Expected ' + expected + ', found ' + ratingShown));
        });
    });

};

module.exports = bwertrSteps;