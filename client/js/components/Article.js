var React = require('react');
var CurrentPath = require('react-router').CurrentPath;
var ArticleStore = require('../stores/ArticleStore');
var ActiveState = require('react-router').ActiveState;
var util = require('util');
var marked = require('marked');

module.exports = React.createClass({
    displayName: 'Article',
    mixins: [ActiveState],
    getInitialState: function() {
        util.log('[Article] Get initial state from ArticleStore');
        return ({ article: ArticleStore.getBySlug(this.props.params.slug)});
    },

    statics: {
        willTransitionTo: function(transition, params, query) {
            util.log('---- TRANSITION ----');
            util.log('[Article] params %s, query %s', util.inspect(params), util.inspect(query));
        },
        requiredData: function(params) {
            return _.merge({
                article: params.articleid
            }, ChildCmponent.requiredData(params))
        }
    },

    _onChange: function() {
        util.log('[Article] Change detected in ArticleStore');
        util.log('[Article] Grab article with slug %s', this.getActiveParams().slug);
        this.setState(this.getInitialState()); 

    },

    componentDidMount: function(){
        util.log('[Article] Mounted new instance');
        ArticleStore.addChangeListener(this._onChange);
    },


    componentWillReceiveProps: function(newProps) {
        util.log('[Article] Component will receive props');
    },

    componentWillMount: function() {
        util.log('[Article] Component will mount');
    },

    componentWillUnmount: function() {
        util.log('[Article] Component will unmount');
        ArticleStore.removeChangeListener(this._onChange);
    },

    /**
     * @todo Add in code highlighting
     *
     */
    render: function() {
        return (
            <div>
                <h1>{this.state.article.title}</h1>
                { this.state.article.content ? 
                    <div dangerouslySetInnerHTML={{__html: marked(this.state.article.content)}}></div>
                : null 
                }
            </div>
        );
    }
});
