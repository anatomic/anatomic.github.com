var EventEmitter = require('events').EventEmitter;
var util = require('util');
var changeEvent = 'change';

function Store() { 
    EventEmitter.call(this);
}

util.inherits(Store, EventEmitter);

Store.prototype.addChangeListener = function(callback) {
    this.on(changeEvent, callback);
};

Store.prototype.removeChangeListener = function(callback) {
    this.removeListener(changeEvent, callback);
}

Store.prototype.emitChange = function() {
    this.emit(changeEvent);
}

module.exports = Store;
