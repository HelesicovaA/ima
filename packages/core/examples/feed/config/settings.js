export var init = (ns, oc, config) => { // jshint ignore:line

	var nsSettings = ns.namespace('$Settings');

	var settings = {
		dev: {
			$Http: {
				baseUrl: '', // jshint ignore:line
				timeout: 2000,
				repeatRequest: 1,
				ttl: 0,
				accept: 'application/json',
				cachePrefix: 'http.',
				cachePrefixPromise: 'http.promise.'
			},
			$Socket: {
				webSocketUrl: '//localhost:3031', // => ws://localhost:3031/websocket
				maxRepeatedAttempts: 2
			},
			$Cache: {
				enabled: true,
				ttl: 60000
			},
			$Page:{
				$Render: {
					scripts: [
					'/static/js/shim.js',
					'/static/js/vendor.client.js',
					'/static/js/locale/'+config.$Language+'.js',
					'/static/js/app.client.js'
					],
					masterView: 'App.Component.Layout.Master.View',
					masterElementId: 'page'
				}
			},
			$Static: {
				image: '/static/img'
			},
			Api: {
				items: '/items',
				categories: '/categories'
			},
			Images: {
				fbShare: '/imajs-share.png'
			}
		},
		prod: {
			$Http: {
				baseUrl: config.$Protocol + '//www.example.com/api', // jshint ignore:line
				timeout: 2000,
				repeatRequest: 1,
				ttl: 0,
				accept: 'application/json',
				cachePrefix: 'http.',
				cachePrefixPromise: 'http.promise.'
			},
			$Socket:{
				webSocketUrl: '//www.example.com',
				maxRepeatedAttempts: 2
			},
			$Cache: {
				enabled: true,
				ttl: 60000
			},
			$PageRender: {
				scripts: [
					'/static/js/locale/'+config.$Language+'.js',
					'/static/js/app.bundle.js'
				],
				masterView: 'App.Component.Layout.Master.View',
				masterElementId: 'page'
			},
			$Static: {
				image: '/static/img'
			},
			Api: {
				contributions: '/contributions',
				services: '/services'
			},
			Images: {
				fbShare: '/imajs-share.png'
			}
		},
		test: {
			$Http: {
				baseUrl: config.$Protocol + '//localhost:3001/api', // jshint ignore:line
					timeout: 2000,
					repeatRequest: 1,
					ttl: 0,
					accept: 'application/json',
					cachePrefix: 'http.',
					cachePrefixPromise: 'http.promise.'
			},
			$Socket:{
				webSocketUrl: '//localhost:3031', // => ws://localhost:3031/websocket
					maxRepeatedAttempts: 2
			},
			$Cache: {
				enabled: true,
				ttl: 60000
			},
			$PageRender: {
				scripts: [
					'/static/js/shim.js',
					'/static/js/vendor.client.js',
					'/static/js/locale/'+config.$Language+'.js',
					'/static/js/app.client.js',
					'/static/js/facebook.js'
				],
					masterView: 'App.Component.Layout.Master.View',
					masterElementId: 'page'
			},
			$Static: {
				image: '/static/img'
			},
			Api: {
				contributions: '/contributions',
				services: '/services'
			},
			Images: {
				fbShare: '/imajs-share.png'
			}
		}
	};

	var envSettings = settings[config.$Env]; // jshint ignore:line

	for (var envKey of Object.keys(envSettings)) {
		nsSettings[envKey] = envSettings[envKey];
	}

	nsSettings['$Env'] = config.$Env; // jshint ignore:line
	nsSettings['$Protocol'] = config.$Protocol; // jshint ignore:line
	nsSettings['$Language'] = config.$Language; // jshint ignore:line
	nsSettings['$Domain'] = config.$Domain; // jshint ignore:line
	nsSettings['$Root'] = config.$Root; // jshint ignore:line
	nsSettings['$LanguagePartPath'] = config.$LanguagePartPath; // jshint ignore:line
};