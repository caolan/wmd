var fs = require('fs'),
    Script = process.binding('evals').Script;


// showdown.js isn't a commonjs module :(
var loadShowdown = function (filename) {
    var sandbox = {};
    var content = fs.readFileSync(filename, 'utf8');
    Script.runInNewContext(content, sandbox);
    return sandbox.Showdown;
};
var Showdown = loadShowdown(__dirname + '/vendor/showdown/src/showdown.js');
var converter = new Showdown.converter();


var default_options = {
    preprocessors: []
};

var readOptions = function (options) {
    var obj = default_options;
    for (var k in options) {
        obj[k] = options[k];
    }
    return obj;
};

exports.html = function (content, options) {
    var opt = readOptions(options);

    var preprocessed = opt.preprocessors.reduce(function (content, fn) {
        return fn(content);
    }, content);

    return converter.makeHtml(preprocessed);
};
