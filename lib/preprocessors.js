var gsub = require('./utils').gsub;

// github-flavored-markdown underscore changes

exports.underscores = function (doc) {
    // prevent foo_bar_baz from ending up with an italic word in the middle
    doc.markdown = gsub(doc.markdown,
        /(^(?! {4}|\t)\w+_\w+_\w[\w_]*)/, function (match) {
            var count = 0;
            for (var i = 0; i < match.length; i++) {
                if (match[i] == '_') count++;
            }
            if (count === 2) {
                return match.replace(/_/g, '\\_');
            }
            return match;
        }
    );
    return doc;
};


// github-flavored-markdown newline changes - currently BROKEN

// in very clear cases, let newlines become <br /> tags
/*doc.markdown = gsub(doc.markdown,
    /(\A|^$\n)(^\w[^\n]*\n)(^\w[^\n]*$)+/m, function (match, group1) {
        return match.replace(/^(.+)$/, group1 + '  ');
    }
);*/
