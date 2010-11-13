var jsdom = require('../deps/jsdom/lib/jsdom').jsdom,
    htmlparser = require('../deps/node-htmlparser/lib/node-htmlparser');


exports.jsdom = function (doc) {
    doc.window = jsdom(doc.html, jsdom.defaultLevel, {
        parser: htmlparser
    }).createWindow();
    return doc;
};

exports.first_para = function (doc) {
    if (!doc.window) doc = exports.jsdom(doc);
    var tags = doc.window.document.getElementsByTagName("P");
    doc.first_para = tags.length ? tags[0].innerHTML: null;
    return doc;
};

exports.heading = function (doc) {
    if (!doc.window) doc = exports.jsdom(doc);
    var tags = doc.window.document.getElementsByTagName("H1");
    doc.heading = tags.length ? tags[0].innerHTML: null;
    return doc;
};
