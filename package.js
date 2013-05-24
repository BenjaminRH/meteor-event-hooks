Package.describe({
	summary: "Provides hooks for various user-triggered events"
});

Package.on_use(function (api) {
	api.add_files(['event_hooks.js'], 'client');
	api.add_files(['server_methods.js'], 'server');
});