var fs = require('fs'),
    Script = process.binding('evals').Script;


// showdown.js isn't a commonjs module, load it and export it
exports.Showdown = (function () {
    var sandbox = {};
    var filename = __dirname + '/vendor/showdown/src/showdown.js';
    var content = fs.readFileSync(filename, 'utf8');
    Script.runInNewContext(content, sandbox);
    return sandbox.Showdown;
})();

// create a showdown converter instance to use
exports.processor = new exports.Showdown.converter().makeHtml;


var readOptions = function (options) {
    var obj = {
        preprocessors: []
    };
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

    return exports.processor(preprocessed);
};
