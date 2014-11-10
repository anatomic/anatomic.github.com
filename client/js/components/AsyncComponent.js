var React = require('react');
module.exports = {
    loadedComponent: null,

    load: function() {
        if (this.loadedComponent) {
            return;
        }

        this.bundle(function(component) {
            this.loadedComponent = component;
            this.forceUpdate();
        }.bind(this));
    },

    componentDidMount: function() {
        this.load();
    },

    render: function() {
        var component = this.loadedComponent;
        return component ? React.createElement(component, this.props) : this.preRender();
    },

    preRender: function() {
        return (
            <div>
                Loading...
            </div>
        );
    }
};
