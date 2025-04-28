import { request as HTTPSRequest } from '@nativescript-community/https'
import { HttpRequestOptions } from '@nativescript/core'
import { merge } from 'lodash'
//import qs from 'qs'
import QueryString from 'query-string'
import { emitter } from '~/app'
import { logOut } from '~/utils/misc'
import { useSettingsStore } from './store'

const guest_urls = [`${process.env.API_URL}/login`, `${process.env.API_URL}/password/request`, `${process.env.API_URL}/password/recovery`, `${process.env.API_URL}/password/reset`]

const config = () => {
	return {
		url: '',
		method: 'GET',
		//timeout: 30000,
		headers: {
			'Content-Type': 'application/json',
			Cookie: process.env.APP_ENV === 'local' ? 'XDEBUG_SESSION=start' : '',
			Accept: 'application/json',
			'X-Requested-With': 'XMLHttpRequest',
			Authorization: `Bearer ${useSettingsStore().getToken}`,
			//'accept-encoding': 'gzip, deflate, br',
		},
		dontFollowRedirects: true,
		allowLargeResponse: true,
	} as HttpRequestOptions
}

const request = (config: HttpRequestOptions) => {
	return new Promise<any>((resolve, reject) => {
		if (useSettingsStore().getToken === null && !guest_urls.includes(config.url)) {
			logOut()
			return reject()
		}

		// @ts-ignore
		HTTPSRequest(config)
			.then(
				(response) => {
					const data = response.content?.toJSON()
					if (response.statusCode === 200) {
						resolve(data)
						// @ts-ignore
					} else if (response?.statusCode >= 400 && response?.statusCode < 500) {
						emitter.emit('showBanner', { message: data?.message ?? response.reason, style: 'warning' })
						reject(response.content?.toJSON())
						if (response.statusCode === 401) {
							logOut()
						}
					} else {
						emitter.emit('showBanner', { message: response.reason, style: 'error' })
						reject(response)
					}
				},
				(e) => reject(e)
			)
			.catch((e) => reject(e))
	})
}

export const query = (query?) => QueryString.stringify(query, { arrayFormat: 'bracket' }) // qs.stringify(query, { addQueryPrefix: true })
export const URL = (path: string) => `${process.env.API_URL}${path}`

const http = {
	get: (path: string, params?: object, options: object = {}) => {
		let url = URL(path)
		if (params) {
			url = URL(path) + query(params)
		}
		return request({
			...merge(config(), options),
			url,
			method: 'GET',
		})
	},
	post: (path: string, payload = {}, options: object = {}) => {
		let url = URL(path)

		return request({
			...merge(config(), options),
			url,
			method: 'POST',
			content: JSON.stringify(payload),
		})
	},
	put: (path: string, payload = {}, options: object = {}) => {
		let url = URL(path)
		return request({
			...merge(config(), options),
			url,
			method: 'PUT',
			content: JSON.stringify(payload),
		})
	},

	patch: (path: string, payload = {}, options: object = {}) => {
		let url = URL(path)
		return request({
			...merge(config(), options),
			url,
			method: 'PATCH',
			content: JSON.stringify(payload),
		})
	},

	delete: (path: string, params?: object, options: object = {}) => {
		let url = URL(path)
		if (params) {
			url = URL(path) + query(params)
		}
		return request({
			...merge(config(), options),
			url,
			method: 'DELETE',
		})
	},
}

export default http
