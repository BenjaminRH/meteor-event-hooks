Hooks = {};

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
	}
});