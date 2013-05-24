Hooks = {
	updateFocus: 500, // Number of milliseconds to wait before checking whether the window is focused
	focusState: true,
	checkFocus: function () {
		// Check if the window is currently focused
		if (document.hasFocus() && Hooks.focusState === false) {
			// We've gained focus
			Hooks.focusState = true;
			if (Hooks.onGainFocus !== undefined) Hooks.onGainFocus(); // Fire the event on the client
			Meteor.call('eventsOnGainFocus'); // Fire the event on the server
		} else if (! document.hasFocus() && Hooks.focusState === true) {
			// We've lost focus
			Hooks.focusState = false;
			if (Hooks.onLoseFocus !== undefined) Hooks.onLoseFocus(); // Fire the event on the client
			Meteor.call('eventsOnLoseFocus'); // Fire the event on the server
		}
	},
	init: function () {
		// Start checking for focus
		Meteor.setInterval(Hooks.checkFocus, Hooks.updateFocus);

		// Close window/tab
		window.onbeforeunload = function() {
			if (Hooks.onCloseSession !== undefined) Hooks.onCloseSession(); // Fire the event on the client
			Meteor.call('eventsOnCloseSession'); // Fire the event on the server
		}
	},
	onLoseFocus: function(){},
	onGainFocus: function(){}
};