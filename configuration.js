const fs = require('fs')

const configurations = {
    getAll(configFileFullName) {
        // If it was already loaded, then return it from memory
        if (global.configFileFullName) {
            return global.configFileFullName
        }

        // If not, read the YML file and return it from there
        const configFileStream = fs.readFileSync(configFileFullName, 'utf8')
        // Try loading and parsing config file
        try {
            const yaml = require('js-yaml')
            const config = yaml.safeLoad(configFileStream)
            global.configFileFullName = config

            return global.configFileFullName
        } catch (error) {
            console.error(
                `Failed to load configuration file.${JSON.stringify(error)}`
            )
            throw error
        }
    },
}
module.exports = configurations
