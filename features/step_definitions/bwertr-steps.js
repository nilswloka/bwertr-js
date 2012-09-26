var bwertrSteps = function bwertrSteps() {
    'use strict';

    var request = require('request');

    this.Given(/^there are (\d+) ratings$/, function (numberOfRatings, callback) {
        request({
            // Reset bwertr
            uri: 'http://localhost:3000/ratings',
            method: 'DELETE'
        }, function () {
            if (numberOfRatings == 0) {
                callback();
            } else {
                var ratings = 0,
                    count;
                // Ensure number of ratings exist
                for (count = 0; count < numberOfRatings; count++) {
                    // * Rate with rating
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
        var self = this;
        self.page.open('http://localhost:3000', function () {
            self.page.evaluate(function () {
                return document.title;
            }, function (err, title) {
                if (title == 'Welcome to bwertr!') {
                    callback();
                } else {
                    callback.fail(new Error('Not on welcome page (title: ' + title + ')'));
                }
            });
        });
    });

    this.Then(/^I can see that there are (\d+) ratings\.$/, function (expectedNumberOfRatings, callback) {
        this.page.evaluate(function () {
            return document.getElementById('numberOfRatings').innerText;
        }, function (err, numberOfRatings) {
            if (numberOfRatings == expectedNumberOfRatings) {
                callback();
            } else {
                callback.fail(new Error('Expected ' + expectedNumberOfRatings + ', found ' + numberOfRatings));
            }
        });
    });

};

module.exports = bwertrSteps;