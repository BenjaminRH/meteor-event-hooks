Hooks = {
	init: function () {
		// Setup event listeners

		// Lose focus
		window.onblur = function () {
			if (Hooks.onLoseFocus !== undefined) Hooks.onLoseFocus(); // Fire the event on the client
			Meteor.call('eventsOnLoseFocus'); // Fire the event on the server
		}

		// Gain focus
		window.onfocus = function () {
			if (Hooks.onGainFocus !== undefined) Hooks.onGainFocus(); // Fire the event on the client
			Meteor.call('eventsOnGainFocus'); // Fire the event on the server
		}

		// Close window/tab
		var handleClose = function() {
			if (Hooks.onCloseSession !== undefined) Hooks.onCloseSession(); // Fire the event on the client
			Meteor.call('eventsOnCloseSession'); // Fire the event on the server
		}
		if (window.onunload !== undefined) window.onunload = function() { handleClose(); }
		else window.close = function() { handleClose(); }
	}
};