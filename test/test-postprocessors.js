var wmd = require('../lib/wmd'),
    jsdom = wmd.postprocessors.jsdom,
    first_para = wmd.postprocessors.first_para,
    heading = wmd.postprocessors.heading;


function createDoc() {
    return {
        html: '<h1>title text</h1>' +
              '<p>first paragraph</p>' +
              '<p>second paragrapg</p>'
    };
}

exports['jsdom'] = function (test) {
    var doc = createDoc();
    var doc2 = jsdom(doc);
    test.equal(doc2.html, doc.html);
    test.equal(doc2.window.document.innerHTML, doc.html);
    test.equal(
        doc2.window.document.getElementsByTagName("H1")[0].innerHTML,
        'title text'
    );
    test.done();
};

exports['first_para'] = function (test) {
    var doc = createDoc();
    var doc2 = first_para(doc);
    test.equal(doc2.first_para, 'first paragraph');
    test.done();
};

exports['heading'] = function (test) {
    var doc = createDoc();
    var doc2 = heading(doc);
    test.equal(doc2.heading, 'title text');
    test.done();
};
