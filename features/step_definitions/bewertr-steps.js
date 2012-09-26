/*global module*/
var bwertrSteps = function bwertrSteps() {
    "use strict";

    this.Given(/^there are (\d+) ratings$/, function (numberOfRatings, callback) {
        // Reset bwertr
        // Ensure number of ratings exist
        callback.pending();
    });

    this.When(/^I visit the application$/, function (callback) {
        // Visit bwertr
        callback.pending();
    });

    this.Then(/^I can see that there are (\d+) ratings\.$/, function (expectedNumberOfRatings, callback) {
        // Assert number of ratings shown equals expected number of ratings
        callback.pending();
    });

};

module.exports = bwertrSteps;