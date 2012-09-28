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
                if (err) {
                    callback.fail(new Error(err));
                } else if (title == 'Welcome to bwertr!') {
                    callback();
                } else {
                    callback.fail(new Error('Not on welcome page (title: ' + title + ')'));
                }
            });
        });
    });

    this.When(/^I rate with "([^"]*)"$/, function (rating, callback) {
        var self = this;
        self.page.open('http://localhost:3000', function () {
            self.page.evaluate(function () {
                var select = document.getElementById('rating'),
                    option,
                    numberOfOptions,
                    i = 0;
                for (i = 0, numberOfOptions = select.length; i < numberOfOptions; i++) {
                    if (select.options[i].text == rating) {
                        selected.selectedIndex = i;
                        break;
                    }
                }
            }, function (err) {
                if (err) {
                    callback.fail(new Error(err));
                } else {
                    callback();
                }
            });
        });
    });

    this.Then(/^I can see that there are (\d+) ratings\.$/, function (expectedNumberOfRatings, callback) {
        this.page.evaluate(function () {
            return document.getElementById('numberOfRatings').innerText;
        }, function (err, numberOfRatings) {
            if (err) {
                callback.fail(new Error(err));
            } else if (numberOfRatings == expectedNumberOfRatings) {
                callback();
            } else {
                callback.fail(new Error('Expected ' + expectedNumberOfRatings + ', found ' + numberOfRatings));
            }
        });
    });

    this.Then(/^I can see that I have rated with "([^"]*)"$/, function (expectedRating, callback) {
        this.page.evaluate(function () {
            return document.getElementById('givenRating').innerText;
        }, function (err, givenRating) {
           if (err) {
               callback.fail(new Error(err));
           } else if (givenRating == expectedRating) {
               callback();
           } else {
               callback.fail(new Error('Expected ' + expectedRating + ', found ' + givenRating));
           }
        });
    });

};

module.exports = bwertrSteps;