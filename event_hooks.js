//////////////////////////////////
//= SETUP HOOKS OBJECT
//////////////////////////////////

Hooks = {
	// OPTIONS
	updateFocus: 0, // Number of milliseconds to wait before checking whether the window is focused
	treatCloseAsLogout: false,

	// INTERNAL STATES
	focused: true,
	loggedIn: false,

	// METHODS
	checkFocus: function () {
		// Check if the window is currently focused
		if (document.hasFocus() && Hooks.focused === false) {
			// We've gained focus
			Hooks.focused = true;
			if (Hooks.onGainFocus !== undefined) Hooks.onGainFocus(); // Fire the event on the client
			Meteor.call('eventsOnGainFocus'); // Fire the event on the server
		} else if (! document.hasFocus() && Hooks.focused === true) {
			// We've lost focus
			Hooks.focused = false;
			if (Hooks.onLoseFocus !== undefined) Hooks.onLoseFocus(); // Fire the event on the client
			Meteor.call('eventsOnLoseFocus'); // Fire the event on the server
		}
	},
	init: function (options) {
		// Initialize options
		if (options !== undefined) {
			if (options.updateFocus) Hooks.updateFocus = options.updateFocus;
			if (options.treatCloseAsLogout) Hooks.treatCloseAsLogout = options.treatCloseAsLogout;
		}

		// Start checking for focus if a truthy integer is given
		if (Hooks.updateFocus != false) {
			Meteor.setInterval(Hooks.checkFocus, Hooks.updateFocus);
		}

		// Close window/tab
		window.onbeforeunload = function() {
			Meteor.call('eventsOnCloseSession'); // Fire the event on the server

			// If we're treating close as logout, fire the logout event as well
			if (Hooks.treatCloseAsLogout === true) {
				Meteor.call('eventsOnLoggedOut'); // Fire the event on the server
			}
		}

		// Setup login monitoring
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
		});
	},
	onLoseFocus:    function(){},
	onGainFocus:    function(){},
	onCloseSession: function(){},
	onLoggedIn:     function(){},
	onLoggedOut:    function(){}
};