Hooks = {
	updateFocus: 500, // Number of milliseconds to wait before checking whether the window is focused
	focusState: true,
	checkFocus: function () {
		// Check if the window is currently focused
		if (document.hasFocus() && this.focusState === false) {
			// We've gained focus
			this.focusState = true;
			if (this.onGainFocus !== undefined) this.onGainFocus(); // Fire the event on the client
			Meteor.call('eventsOnGainFocus'); // Fire the event on the server
		} else if (! document.hasFocus() && this.focusState === true) {
			// We've lost focus
			this.focusState = false;
			if (this.onLoseFocus !== undefined) this.onLoseFocus(); // Fire the event on the client
			Meteor.call('eventsOnLoseFocus'); // Fire the event on the server
		}
	},
	init: function () {
		// Start checking for focus
		Meteor.setInterval(this.checkFocus, this.updateFocus);
	}
};