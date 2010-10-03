/*!
 * WMD - Wanton Markdown
 * Copyright (c) 2010 Caolan McMahon
 */

/**
 * Module dependencies
 */

var fs = require('fs'),
    Script = process.binding('evals').Script;

/**
 * Showdown isn't a commonjs module, load it manually
 */

var Showdown = (function () {
    var sandbox = {};
    var filename = __dirname + '/vendor/showdown/src/showdown.js';
    var content = fs.readFileSync(filename, 'utf8');
    Script.runInNewContext(content, sandbox);
    return sandbox.Showdown;
})();


/**
 * Main function for converting markdown to HTML.
 *
 * @param {String} content
 * @param {Object} options
 * @return {String}
 * @api public
 */

var exports = module.exports = function (content, options) {
    var opt = exports.readOptions(options);
    var preprocessed = exports.preprocess(content, opt);
    return exports.processor(preprocessed);
};


/**
 * Create a Showdown converter instance to use and export it
 *
 * @param {String} content
 * @return {String}
 * @api public
 */

exports.processor = new Showdown.converter().makeHtml;

/**
 * Extends a default set of options with those passed to it.
 *
 * @param {Object} options
 * @return {Object}
 * @api public
 */

exports.readOptions = function (options) {
    var obj = {
        preprocessors: []
    };
    for (var k in options) {
        obj[k] = options[k];
    }
    return obj;
};

/**
 * Runs all the preprocessors defined in options on the raw markdown content.
 * This is executed before passing the content to the processor function to be
 * turned into HTML.
 *
 * @param {String} content
 * @param {Object} options
 * @return {String}
 * @api public
 */

exports.preprocess = function (content, options) {
    return options.preprocessors.reduce(function (content, fn) {
        return fn(content);
    }, content);
};
