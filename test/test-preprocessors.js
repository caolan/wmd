var wmd = require('../lib/wmd'),
    underscores = wmd.preprocessors.underscores;


var mkTest = function (test, fn) {
    return function (input, expected) {
        var doc = {markdown: input};
        test.same(fn(doc), {markdown: expected});
    };
};

// underscore changes from github-flavored-markdown

exports['underscores'] = function (test) {
    var testOutput = mkTest(test, underscores);
    // not touch single underscores inside words
    testOutput('foo_bar', 'foo_bar');
    // not touch underscores in code blocks
    testOutput('    foo_bar', '    foo_bar');
    // not touch underscores in pre blocks
    testOutput('<pre>\nfoo_bar_baz\n</pre>', '<pre>\nfoo_bar_baz\n</pre>');
    // escape two or more underscores inside words
    testOutput("foo_bar_baz", "foo\\_bar\\_baz");
    test.done();
};

// Tests for newline changes in github-flavored-markdown:
/*
    // turn newlines into br tags in simple cases
    testOutput("foo  \nbar", "foo\nbar");
    // convert newlines in all groups
    testOutput(
        "apple\npear\norange\n\nruby\npython\nerlang",
        "apple  \npear  \norange\n\nruby  \npython  \nerlang"
    );
    // not convert newlines in lists
    testOutput("# foo\n# bar", "# foo\n# bar");
    testOutput("* foo\n* bar", "* foo\n* bar");
*/
