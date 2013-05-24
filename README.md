## Event Hooks - Meteor Smart Package

[![endorse](https://api.coderwall.com/benjaminrh/endorsecount.png)](https://coderwall.com/benjaminrh)

Provides hooks for various user-triggered events.


### API

 * `Hooks.init()` (client) - Initialize the event system. Put this in your `Meteor.startup`
 * `Hooks.onLoseFocus = function () { ... }` (anywhere) - Provide a callback to run when the window loses focus
 * `Hooks.onGainFocus = function () { ... }` (anywhere) - Provide a callback to run when the window gains focus
 * `Hooks.onCloseSession = function () { ... }` (server) - Provide a callback to run when the window/tab is closed
 * `Hooks.onLoggedIn = function () { ... }` (anywhere) - Provide a callback to run when a user has logged in
 * `Hooks.onLoggedOut = function () { ... }` (anywhere) - Provide a callback to run when a user has logged out


### Options

 * `Hooks.updateFocus` (client) - Number of milliseconds to wait before checking whether the window is focused (default is 500)
 * `Hooks.treatCloseAsLogout ` (client) - If true, treat closing the browser window as logging off (meaning that the `onLoggedOut` callback is triggered in addition to the `onCloseSession`) (default is false)


### How to use?

1. Install [meteorite](https://github.com/oortcloud/meteorite)
2. `mrt add event-hooks`
3. Add `Hooks.init()` to your `Meteor.startup` method

That's it!