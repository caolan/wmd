var wmd = require('../lib/wmd');


exports['processor'] = function (test) {
    test.equals(
        wmd.processor('Markdown *rocks*.'),
        '<p>Markdown <em>rocks</em>.</p>'
    );
    test.done();
};

exports['preprocess'] = function (test) {
    test.expect(3);
    var options = {
        preprocessors: [
            function (content) {
                test.equals(content, 'original markdown');
                return 'preprocessor 1';
            },
            function (content) {
                test.equals(content, 'preprocessor 1');
                return 'preprocessor 2';
            }
        ]
    };
    test.equals(wmd.preprocess('original markdown', options), 'preprocessor 2');
    test.done();
};

exports['wmd'] = function (test) {
    test.expect(8);

    // create a copy of all exported functions so we can safely stub them
    var _wmd = {};
    for (var k in wmd) _wmd[k] = wmd[k];

    wmd.readOptions = function (options) {
        test.equals(options, 'options');
        return 'read options';
    };
    wmd.preprocess = function (content, options) {
        test.same(content, {markdown: 'content', raw: 'content'});
        test.equals(options, 'read options');
        content.markdown = 'preprocessed';
        return content;
    };
    wmd.processor = function (content) {
        test.equals(content, 'preprocessed');
        return 'processed';
    };

    var doc = wmd('content', 'options');
    test.equals(doc, 'processed');
    test.equals(doc.html, 'processed');
    test.equals(doc.raw, 'content');
    test.equals(doc.markdown, 'preprocessed');

    // reinstate original exported functions
    for (var k in _wmd) wmd[k] = _wmd;
    test.done();
};
