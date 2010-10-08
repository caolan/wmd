# WMD

A Markdown parser for CommonJS (and node.js) based on the excellent
[Showdown](http://attacklab.net/showdown/).

Essentially WMD, is just a wrapper around Showdown, with a few hooks for
preprocessing, and some default preprocessors.


## Example

    var wmd = require('wmd');

    var html = wmd('Markdown *rocks*.');
    console.log(html);


# Documentation


## wmd(markdown, options)

* __markdown__ - A string containing Markdown.
* __options__ - (optional) An object containing options (see options section)

The main function for converting Markdown to HTML, and normally the only
function you'll need ot use. Applies all preprocessors defined in options
before passing the result to Showdown for the final rendering.

By default, the underscores and metadata preprocessors are used.

This function returns a __doc__ object. The contents of the doc object may
differ depending on the preprocessors used, but will always contain the
following:

* __doc.html__ - The final HTML output of the conversion.
* __doc.markdown__ - The markdown text passed to the processsor after all
  preprocesor functions have been applied.
* __doc.raw__ - The raw string before preprocessors were applied.

The string representation of a doc object (doc.toString()) is the same as
doc.html.


## wmd.preprocessors

An object containing core preprocessor functions:

* __underscores__ - code-friendly underscore processing taken from GitHub
  Flavored Markdown. This means the bar in foo\_bar\_baz does not get emphasis.
* __metadata__ - takes metatdata information from the top of a markdown file
  and adds it to doc.metadata.

      property1: some value
      property2: multi
                 line
                 value

      # Markdown goes here

  Would result in the following doc object:

      {
          metadata: {
              property1: "some value",
              property2: "multi\nline\nvalue"
          },
          html: "<h1>Markdown goes here</h1>",
          markdown: "# Markdown goes here",
          raw: "property1: some value\nproperty2: multi\nline\nvalue\n\n# Markdown goes here"
      }


## wmd.processor(markdown)

* __markdown__ - A string containing Markdown.

The function which performs the conversion from markdown to html. By default
this is just Showdown's makeHTML function.


## wmd.preprocess(doc, options)

* __doc__ - A doc object
* __options__ - (optional) An object containing options (see options section)

Applies the preprocessor functions defined in options to the doc (usually
updating doc.markdown, sometimes adding new properties) before the doc is
passed to the processor.


## wmd.readOptions(options)

* __options__ - (optional) An object containing options (see options section)

You would not normally need to call this directly. This function adds default
options to those passed to the main wmd function.


## Options

* __preprocessors__ - An array of functions which can transform the document
  before its passed to the processor function. By default the underscores and
  metadata preprocessors are used.
