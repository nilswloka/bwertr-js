ATDD Sample Application bwertr-js
=================================

[![Build Status](https://secure.travis-ci.org/nilswloka/bwertr-js.png)](http://travis-ci.org/nilswloka/bwertr-js)

**Work in progress**

A simple sample application demonstrating ATDD, based on https://github.com/stefanscheidt/bwertr-java.

You will need to have the following things installed:

* [node](http://nodejs.org/)
* [yeoman](http://yeoman.io/)
* [mongodb](http://www.mongodb.org/)
* Any Java Runtime Environment (for starting the Selenium Server)

Inside the project directory, do the following to test, build and run the application:

* `npm install` to install all dependencies
* `mongod --dbpath var &` to start the mongodb server
* `java -jar lib/selenium-server-standalone-2.25.0.jar &` to start the Selenium Server
* `node app &` to start the bwertr server
* `npm yeoman-test && npm yeoman-build` to test and build the bwertr client
* `npm test` to run the end-to-end tests

You can have a look at the application at http://localhost:3000.

The bwertr-js kata
==================

So far, there aren't any tags for practicing the bwertr-js kata. I will add those once I have practiced this
a few times myself.