var React = require('react');
var ArticleStore = require('../stores/ArticleStore');
var {Link} = require('react-router');

module.exports = React.createClass({
    displayName: 'Homepage',
    
    getInitialState: function() {
        return { 
            articles: ArticleStore.getAll({order: 'desc'})
        }
    },

    render: function() {
        var articles = this.state.articles.map(function(article) {
           return (
               <Link to="article" params={{year: 12, month: 12, slug: article.slug}}>
                <h2>{article.title}</h2>
               </Link>
           )
        });
        return <div>{articles}</div>
    }
});
