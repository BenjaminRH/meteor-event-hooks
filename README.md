## Event Hooks - Meteor Smart Package

[![endorse](https://api.coderwall.com/benjaminrh/endorsecount.png)](https://coderwall.com/benjaminrh)

Provides hooks for various user-triggered events.


### API

 * `Hooks.init([options])` ( _client_ ) - Initialize the event system. Optionally provide an `Object` to set the options. Put this in your `Meteor.startup`.
 * `Hooks.onLoseFocus = function () { ... }` ( _anywhere_ )* - Provide a callback to run when the window loses focus
 * `Hooks.onGainFocus = function () { ... }` ( _anywhere_ )* - Provide a callback to run when the window gains focus
 * `Hooks.onCloseSession = function () { ... }` ( _server_ ) - Provide a callback to run when the window/tab is closed
 * `Hooks.onLoggedIn = function () { ... }` ( _anywhere_ ) - Provide a callback to run when a user has logged in
 * `Hooks.onLoggedOut = function () { ... }` ( _anywhere_ ) - Provide a callback to run when a user has logged out


### Options

 * `updateFocus` ( _Integer_ ) - Number of milliseconds to wait before checking whether the window is focused. Default is `0`, meaning unless you change this, the `onLoseFocus` and `onGainFocus` methods won't be available.
 * `treatCloseAsLogout` ( _Boolean_ ) - If true, treat closing the browser window as logging off (meaning that the `onLoggedOut` callback is triggered in addition to the `onCloseSession`). Default is `false`.


### How to use?

1. Install [meteorite](https://github.com/oortcloud/meteorite)
2. `mrt add event-hooks`
3. Add `Hooks.init()` to your `Meteor.startup`

That's it!