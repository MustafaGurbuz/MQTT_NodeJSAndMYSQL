// MQTT Publisher

var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://localhost:8083')
var topic = 'DigiterraTest1'
var message = 'Test is successfull!'

client.on('connect', () => {
    setInterval(() => {
        client.publish(topic, message)
        console.log('Message sent!', message)
    }, 5000)
})