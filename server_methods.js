Hooks = {
	onLoseFocus:    function(){},
	onGainFocus:    function(){},
	onCloseSession: function(){},
	onLoggedIn:     function(){},
	onLoggedOut:    function(){}
};

Meteor.methods({
	eventsOnLoseFocus: function () {
		// Fire the loseFocus event
		if (Hooks.onLoseFocus !== undefined) Hooks.onLoseFocus();
	},
	eventsOnGainFocus: function () {
		// Fire the gainFocus event
		if (Hooks.onGainFocus !== undefined) Hooks.onGainFocus();
	},
	eventsOnCloseSession: function () {
		// Fire the closeSession event
		if (Hooks.onCloseSession !== undefined) Hooks.onCloseSession();
	},
	eventsOnLoggedIn: function () {
		// Fire the loggedIn event
		if (Hooks.onLoggedIn !== undefined) Hooks.onLoggedIn();
	},
	eventsOnLoggedOut: function () {
		// Fire the loggedOut event
		if (Hooks.onLoggedOut !== undefined) Hooks.onLoggedOut();
	}
});