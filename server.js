//////////////////////////////////
//= SETUP HOOKS OBJECT
//////////////////////////////////

Hooks = {
    onLoseFocus:    function(){},
    onGainFocus:    function(){},
    onCloseSession: function(){},
    onLoggedIn:     function(){},
    onLoggedOut:    function(){},
    onCreateUser:   function(){},
    onDeleteUser:   function(){}
};


//////////////////////////////////
//= SETUP METEOR METHODS
//////////////////////////////////

Meteor.methods({
    eventsOnLoseFocus: function () {
        // Fire the loseFocus event
        Hooks.onLoseFocus(this.userId);
    },
    eventsOnGainFocus: function () {
        // Fire the gainFocus event
        Hooks.onGainFocus(this.userId);
    },
    eventsOnCloseSession: function () {
        // Fire the closeSession event
        Hooks.onCloseSession(this.userId);
    },
    eventsOnLoggedIn: function () {
        // Fire the loggedIn event
        Hooks.onLoggedIn(this.userId);
    },
    eventsOnLoggedOut: function (userId) {
        // Fire the loggedOut event
        Hooks.onLoggedOut(userId);
    }
});


//////////////////////////////////
//= SETUP USER MONITORING
//////////////////////////////////

var currentUsers = Meteor.users.find().count();
var userCount;

// Begin monitoring users
Meteor.users.find({}, { limit: 1, sort: { createdAt: -1 } }).observeChanges({
    added: function (id, fields) {
        userCount = Meteor.users.find().count();

        if (userCount > currentUsers) {
            currentUsers = userCount;
            Hooks.onCreateUser(id); // Fire the event on the server
        }
    }
});

Meteor.users.find().observeChanges({
    removed: function (id) {
        currentUsers = Meteor.users.find().count();
        Hooks.onDeleteUser(id); // Fire the event on the server
    }
});
