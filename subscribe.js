// MQTT Subscriber

var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://localhost:8083')
var topic = 'DigiterraTest1'

client.on('message', (topic, message) => {
    message = message.toString()
    console.log(message)
})

client.on('connect', () => {
    client.subscribe(topic)
})
