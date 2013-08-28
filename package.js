Package.describe({
	summary: "Provides hooks for various user-triggered events"
});

var both = ['client', 'server']

Package.on_use(function (api) {
	api.add_files(['client.js'], 'client');
	api.add_files(['server.js'], 'server');
	api.add_files(['common.js'], both);

	if (typeof api.export !== 'undefined') {
		api.export(['Hooks', 'EventHooksMonitoringCollection'], both);
	}
});
