@NativeClass()
@ObjCClass(UIApplicationDelegate)
export default class AppDelegate extends UIResponder implements UIApplicationDelegate {
	applicationDidFinishLaunchingWithOptions(_application: UIApplication, _launchOptions: NSDictionary<string, any>): boolean {
		if (process.env.APP_ENV !== 'local') {
			const config = BugsnagConfiguration.loadConfig()
			config.releaseStage = process.env.APP_ENV ?? 'production'
			config.reportBackgroundAppHangs = true
			Bugsnag.startWithConfiguration(config)

			//BugsnagPerformance.start()

			//const perf_config = BugsnagPerformanceConfiguration.loadConfig()
			//config.autoInstrumentNetworkRequests = true
			//BugsnagPerformance.startWithConfiguration(perf_config)
		}

		return true
	}

	applicationDidBecomeActive(_application: UIApplication): void {}

	applicationWillResignActive(_application: UIApplication): void {}

	applicationDidEnterBackground(_application: UIApplication): void {}

	applicationWillEnterForeground(_application: UIApplication): void {}

	applicationWillTerminate(_application: UIApplication): void {
		//logout()
	}
}
