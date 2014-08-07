var Highlight = require('highlight.js/lib/highlight'),
    hljs = new Highlight();

hljs.registerLanguage('vim', require('highlight.js/lib/languages/vim.js'));
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml.js'));
hljs.registerLanguage('css', require('highlight.js/lib/languages/css.js'));
hljs.registerLanguage('scss', require('highlight.js/lib/languages/scss.js'));
hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript.js'));
hljs.registerLanguage('markdown', require('highlight.js/lib/languages/markdown.js'));
hljs.registerLanguage('handlebars', require('highlight.js/lib/languages/handlebars.js'));

hljs.initHighlighting();


// Next step will be looking at how to build a navigation system from the json file spat out as a result
// of the build process
