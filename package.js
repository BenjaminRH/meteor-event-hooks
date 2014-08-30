Package.describe({
	summary: "Provides hooks for various user-triggered events"
});

var both = ['client', 'server']

Package.onUse(function (api) {
  api.versionsFrom("METEOR@0.9.0");

	api.addFiles(['client.js'], 'client');
	api.addFiles(['server.js'], 'server');
	api.addFiles(['common.js'], both);

	if (typeof api.export !== 'undefined') {
		api.export(['Hooks', 'EventHooksMonitoringCollection'], both);
	}
});
