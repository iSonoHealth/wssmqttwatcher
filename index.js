const path = require('path')
const configFileFullName = path.join(__dirname, 'config.yml')
const config = require('./configuration').getAll(configFileFullName) // Log Start Message

const mqtt = require("mqtt")
const client = mqtt.connect(config.server_url)
client.on('connect', function () {
    client.subscribe("#", function (err) {
        if (!err) {
            client.publish(`WebSockets MQTT Watcher ${
                config.send_version
                    ? `version: ${config.version}`
                    : ''
                }`, 'Hello')
        }
    })
})

client.on('message', function (topic, message) {
    // message is Buffer
    console.log(`Received message of topic:  ${topic}, size: ${message.length} `)
    //console.log(message.toString())
    //client.end()
})


