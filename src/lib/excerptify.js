var pattern = /<p.*?>(.*)<\/p>/i; // don't be greedy
var entities = {
    '&': /&amp;/g,
    '–': /&mdash;/g,
    '-': /&ndash;/g,
    '...': /&hellip;/g
};

/**
 * Take html as input and return the first paragraph for use elsewhere. This can either include
 * html tags or just a plain string (the default). Also, if maxLength is passed in as one of the
 * options the function will reduce the length of the string and insert ... at the end.
 *
 * @todo: should this operate on the markdown rather than html? This would allow us to choose to 
 * spit out in both formats really easily...
 *
 * @param {String} html
 * @param {Object} opts
 *
 * @returns {String}
 *
 */
module.exports = function(html, opts) {
    var opts = opts || {};
   
    var defaults = {
        maxLength: 0
    };

    var p = getFirstParagraph(html);

    if (defaults.maxLength) {
        p = p.substr(0, defaults.maxLength);
    }

    return p;
};

/**
 * Gets the first paragraph and removes some choice html entities from the html
 *
 * @param {String} html
 * @returns {String}
 *
 */
function getFirstParagraph(html) {
    var matches = pattern.exec(html);

    if (!matches) {
        return '';
    }

    return Object.keys(entities).reduce(function(prev, current){
        return prev.replace(entities[current], current);
    }, matches[1]);
}
