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
		if (Hooks.onLoseFocus !== undefined) Hooks.onLoseFocus(this.userId);
	},
	eventsOnGainFocus: function () {
		// Fire the gainFocus event
		if (Hooks.onGainFocus !== undefined) Hooks.onGainFocus(this.userId);
	},
	eventsOnCloseSession: function () {
		// Fire the closeSession event
		if (Hooks.onCloseSession !== undefined) Hooks.onCloseSession(this.userId);
	},
	eventsOnLoggedIn: function () {
		// Fire the loggedIn event
		if (Hooks.onLoggedIn !== undefined) Hooks.onLoggedIn(this.userId);
	},
	eventsOnLoggedOut: function (userId) {
		// Fire the loggedOut event
		if (Hooks.onLoggedOut !== undefined) Hooks.onLoggedOut(userId);
	}
});


//////////////////////////////////
//= SETUP USER MONITORING
//////////////////////////////////

var addedUsers = false;

// Begin monitoring users
Meteor.users.find({}, { limit: 1, sort: { createdAt: -1 } }).observeChanges({
	added: function (id, fields) {
		if (addedUsers === true) {
			var userCount = Meteor.users.find().count();
			if (Hooks.onCreateUser !== undefined) Hooks.onCreateUser(id); // Fire the event on the server
		} else {
			addedUsers = true;
		}
	}
});

Meteor.users.find().observeChanges({
	removed: function (id) {
		var userCount = Meteor.users.find().count();
		if (Hooks.onDeleteUser !== undefined) Hooks.onDeleteUser(id); // Fire the event on the server
	}
});