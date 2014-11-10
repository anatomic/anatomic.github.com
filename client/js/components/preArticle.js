var React = require('react');
var AsyncMixin = require('./AsyncComponent');

module.exports = React.createClass({
    displayName: 'PreArticle',
    mixins: [AsyncMixin],
    bundle: require('bundle?lazy!./Article')
});
