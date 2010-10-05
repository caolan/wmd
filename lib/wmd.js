/*!
 * WMD - Wanton Markdown
 * Copyright (c) 2010 Caolan McMahon
 */

/**
 * Module dependencies
 */

var fs = require('fs'),
    preprocessors = require('./preprocessors'),
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
    var doc = {raw: content, markdown: content};
    var opt = exports.readOptions(options);
    exports.preprocess(doc, opt);
    doc.html = exports.processor(doc.markdown);
    doc.toString = function () {
        return doc.html;
    };
    return doc;
};


/**
 * Create a Showdown converter instance to use and export it
 *
 * @param {String} markdown
 * @return {String}
 * @api public
 */

exports.processor = new Showdown.converter().makeHtml;

/**
 * Export the preprocessors submodule for convenience
 */

exports.preprocessors = preprocessors;

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
 * Runs all the preprocessors defined in options on the doc object.
 * This is executed before passing the doc's markdown property to the processor
 * function to be turned into HTML.
 *
 * @param {Object} doc
 * @param {Object} options
 * @return {String}
 * @api public
 */

exports.preprocess = function (doc, options) {
    return options.preprocessors.reduce(function (doc, fn) {
        return fn(doc);
    }, doc);
};
