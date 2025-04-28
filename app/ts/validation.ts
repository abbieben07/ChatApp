import { alpha, alpha_dash, alpha_spaces, confirmed, email, integer, is, min, min_value, required, length } from '@vee-validate/rules'
import { PhoneNumberUtil } from 'google-libphonenumber'
import moment from 'moment'
import { defineRule } from 'vee-validate'

const setupVeeValidate = () => {
	defineRule('required', required)
	defineRule('email', email)
	defineRule('confirmed', confirmed)
	defineRule('min_value', min_value)
	defineRule('min', min)
	defineRule('alpha_spaces', alpha_spaces)
	defineRule('alpha_dash', alpha_dash)
	defineRule('alpha', alpha)
	defineRule('integer', integer)
	defineRule('is', is)
	defineRule('length', length)
	defineRule('phone', (value) => {
		const phone = PhoneNumberUtil.getInstance()
		try {
			const number = phone.parse(value)
			return phone.isValidNumber(number)
		} catch (e) {
			return false
		}
	})

	defineRule('date', (value, [format]) => moment(value, format, true).isValid())
}

export default setupVeeValidate
