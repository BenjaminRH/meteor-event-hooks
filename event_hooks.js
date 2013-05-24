//////////////////////////////////
//= SETUP HOOKS OBJECT
//////////////////////////////////

Hooks = {
	updateFocus: 500, // Number of milliseconds to wait before checking whether the window is focused
	focused: true,
	loggedIn: false,
	checkFocus: function () {
		// Check if the window is currently focused
		if (document.hasFocus() && this.focused === false) {
			// We've gained focus
			this.focused = true;
			if (this.onGainFocus !== undefined) this.onGainFocus(); // Fire the event on the client
			Meteor.call('eventsOnGainFocus'); // Fire the event on the server
		} else if (! document.hasFocus() && this.focused === true) {
			// We've lost focus
			this.focused = false;
			if (this.onLoseFocus !== undefined) this.onLoseFocus(); // Fire the event on the client
			Meteor.call('eventsOnLoseFocus'); // Fire the event on the server
		}
	},
	init: function () {
		// Start checking for focus
		Meteor.setInterval(this.checkFocus, this.updateFocus);

		// Close window/tab
		window.onbeforeunload = function() {
			if (this.onCloseSession !== undefined) this.onCloseSession(); // Fire the event on the client
			Meteor.call('eventsOnCloseSession'); // Fire the event on the server
		}
	},
	onLoseFocus:    function(){},
	onGainFocus:    function(){},
	onCloseSession: function(){},
	onLoggedIn:     function(){},
	onLoggedOut:    function(){}
};


//////////////////////////////////
//= SETUP LOGIN MONITORING
//////////////////////////////////

Deps.autorun(function() {
	if (Meteor.userId()) {
		// User is logged in
		if (Hooks.loggedIn === false) {
			// User wasn't logged in before this updated, so fire the loggedIn event
			if (Hooks.onLoggedIn !== undefined) Hooks.onLoggedIn(); // Fire the event on the client
			Meteor.call('eventsOnLoggedIn'); // Fire the event on the server
		}

		Hooks.loggedIn = true; // Now set the proper state
	} else {
		// There is no user logged in right now
		if (Hooks.loggedIn === true) {
			// User was logged in before this updated, so fire the loggedOut event
			if (Hooks.onLoggedOut !== undefined) Hooks.onLoggedOut(); // Fire the event on the client
			Meteor.call('eventsOnLoggedOut'); // Fire the event on the server
		}

		Hooks.loggedIn = false; // Now set the proper state
	}
})