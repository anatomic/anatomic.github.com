var React = require('react');
var ReactRouter = require('react-router');
var Routes = ReactRouter.Routes;
var Route = ReactRouter.Route;
var Home = require('./components/Home');
var Article = require('./components/Article');

var router = (
    <Routes location="history">
        <Route name="home" path="/" handler={Home} />
        <Route name="article" path="/:year/:month/:slug" handler={Article} />
    </Routes>
);

module.exports = router;
