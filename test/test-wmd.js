var wmd = require('../lib/wmd');

exports['basic markdown'] = function (test) {
    test.equals(
        wmd.html('Markdown *rocks*.'),
        '<p>Markdown <em>rocks</em>.</p>'
    );
    test.done();
};

exports['preprocessor execution'] = function (test) {
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
    test.equals(
        wmd.html('original markdown', options),
        '<p>preprocessor 2</p>'
    );
    test.done();
};
