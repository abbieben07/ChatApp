const fs = require("fs")
const path = require("path")

module.exports = function () {
    const appRoot = path.resolve(__dirname, "../../..")
    const platformTempDir = path.join(appRoot, "platforms", "tempPlugin")
    const gradleFileName = "gradle-wrapper.properties"
    const gradleDistributionUrl = "https://services.gradle.org/distributions/gradle-8.10.2-all.zip"

    function updateGradleWrapper(dir) {
        const gradleFilePath = path.join(dir, "gradle", "wrapper", gradleFileName)
        if (fs.existsSync(gradleFilePath)) {
            let content = fs.readFileSync(gradleFilePath, "utf8")
            content = content.replace(
                /(distributionUrl=https:\\/\\/services\\.gradle\\.org\\/distributions\\/gradle-).*?-all\\.zip/,
                `distributionUrl=${gradleDistributionUrl}`
            )
            fs.writeFileSync(gradleFilePath, content, "utf8")
            console.log(`Updated: ${gradleFilePath}`)
        }
    }

    if (fs.existsSync(platformTempDir)) {
        fs.readdirSync(platformTempDir).forEach((pluginDir) => {
            const pluginPath = path.join(platformTempDir, pluginDir)
            updateGradleWrapper(pluginPath)
        })
    }
}