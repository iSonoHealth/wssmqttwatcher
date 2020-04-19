#!/usr/bin/env node

const path = require('path')
const configFileFullName = path.join(__dirname, 'config.yml')
const config = require('./configuration').getAll(configFileFullName) // Log Start Message

const argv = require('yargs').usage(
    '$0 <url>',
    'A simple WebSockets MQTT Watcher',
    (yargs) => {
        yargs.positional('url', {
            describe: `the url you want to watch, set <url> to local will watch ${config.server_url}`,
            type: 'string',
        })
    }
).argv

let url = argv.url

const validUrl = require('valid-url')
if (!validUrl.isUri(url)) {
    if (url === 'local') {
        url = config.server_url
    } else {
        console.log('Provided url is not valid')
        process.exit(1)
    }
}

const mqtt = require('mqtt')
const client = mqtt.connect(url)
client.on('connect', function () {
    client.subscribe('#', function (err) {
        if (!err) {
            client.publish(
                `WebSockets MQTT Watcher ${
                    config.send_version ? `version: ${config.version}` : ''
                }`,
                'Hello'
            )
        }
    })
})

client.on('message', function (topic, message) {
    // message is Buffer
    console.log(`Received message. Topic:  ${topic} Size: ${message.length} `)
    //console.log(message.toString())
})
