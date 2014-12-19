## Event Hooks - Meteor Smart Package

Provides hooks for various user-triggered events.

### API

Currently, all API methods on the server take a `userId` argument.

 * `Hooks.onLoggedIn = function ([server: userId]) { ... }` ( _anywhere_ ) - Provide a callback to run when a user has logged in
 * `Hooks.onLoggedOut = function (userId) { ... }` ( _anywhere_ ) - Provide a callback to run when a user has logged out
 * `Hooks.onCreateUser = function (userId) { ... }` ( _server_ ) - Provide a callback to run when a user is created
 * `Hooks.onDeleteUser = function (userId) { ... }` ( _server_ ) - Provide a callback to run when a user is deleted
 * `Hooks.onLoseFocus = function ([server: userId]) { ... }` ( _anywhere_ )* - Provide a callback to run when the window loses focus. * Opt-in through the `updateFocus` option
 * `Hooks.onGainFocus = function ([server: userId]) { ... }` ( _anywhere_ )* - Provide a callback to run when the window gains focus * Opt-in through the `updateFocus` option
 * `Hooks.onCloseSession = function ([server: userId]) { ... }` ( _server_ ) - Provide a callback to run when the window/tab is closed

### Initialization

 * `Hooks.init([options])` ( _client_ ) - Initialize the event system. Optionally provide an `Object` to set the options. Put this in your `Meteor.startup`

### Options

Options are specified on the client side as an argument (object) in the `init` method.

 * `updateFocus` ( _Integer_ ) - Number of milliseconds to wait before checking whether the window is focused. Default is `0`, meaning unless you change this, the `onLoseFocus` and `onGainFocus` methods won't be available
 * `treatCloseAsLogout` ( _Boolean_ ) - If true, treat closing the browser window as logging off (meaning that the `onLoggedOut` callback is triggered in addition to the `onCloseSession`). Default is `false`

### How to use?

1. Install [meteorite](https://github.com/oortcloud/meteorite)
2. `mrt add event-hooks`
3. Add `Hooks.init()` to your `Meteor.startup` inside of a file inside your client/ directory or inside of an if(Meteor.isClient) block.

```
if(Meteor.isClient){
	Meteor.startup(function(){
		Hooks.init();
	});
}
```
