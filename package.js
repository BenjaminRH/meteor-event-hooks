Package.describe({
	summary: "Provides hooks for various user-triggered events"
});

Package.on_use(function (api) {
	api.add_files(['client.js'], 'client');
	api.add_files(['server.js'], 'server');
	api.add_files(['common.js'], ['client', 'server']);
});