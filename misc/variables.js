const sass = require('sass')

function extractScssVariables() {
	const result = sass.compile('../app/scss/_variables.scss', { style: 'expanded' })
	const variableRegex = /\$([\w-]+):\s*([^;]+);/g

	const variables = {}
	let match

	while ((match = variableRegex.exec(result.css)) !== null) {
		variables[match[1]] = match[2].trim()
	}

	return variables
}
