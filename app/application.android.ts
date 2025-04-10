// @ts-ignore
declare const com: any

@NativeClass()
@JavaProxy('com.nasrda.nsiwc.application')
class Application extends android.app.Application {
	static {
		if (process.env.APP_ENV !== 'local') {
			//com.bugsnag.android.BugsnagPerformance.reportApplicationClassLoaded()
		}
	}

	public onCreate() {
		super.onCreate()
		if (process.env.APP_ENV !== 'local') {
			const config = new com.bugsnag.android.Configuration.load(this)
			config.setReleaseStage(process.env.APP_ENV)
			com.bugsnag.android.Bugsnag.start(this, config)
			//com.bugsnag.android.BugsnagPerformance.start(this)
		}
	}

	public attachBaseContext(baseContext: android.content.Context) {
		super.attachBaseContext(baseContext)
		androidx.multidex.MultiDex.install(this)
	}
}
