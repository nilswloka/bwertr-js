var bwertrSteps = function bwertrSteps() {
    "use strict";

    var request = require('request'),
        zombie = require('zombie'),
        browser = new zombie.Browser();

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
        // Visit bwertr
        browser.visit("http://localhost:3000", function () {
            if (browser.text("title") == "Welcome to bwertr!") {
                callback();
            } else {
                callback.fail(new Error("Not on welcome page."));
            }
        });
    });

    this.Then(/^I can see that there are (\d+) ratings\.$/, function (expectedNumberOfRatings, callback) {
        // Assert number of ratings shown equals expected number of ratings
        callback.pending();
    });

};

module.exports = bwertrSteps;