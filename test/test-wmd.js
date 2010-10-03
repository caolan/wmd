var wmd = require('../lib/wmd');

exports['basic markdown'] = function (test) {
    test.equals(
        wmd.html('Markdown *rocks*.'),
        '<p>Markdown <em>rocks</em>.</p>'
    );
    test.done();
};

exports['preprocessor execution'] = function (test) {
    test.expect(4);

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

    var _processor = wmd.processor;
    wmd.processor = function (content) {
        test.equals(content, 'preprocessor 2');
        return 'processed';
    };

    test.equals(wmd.html('original markdown', options), 'processed');

    wmd.processor = _processor;
    test.done();
};
