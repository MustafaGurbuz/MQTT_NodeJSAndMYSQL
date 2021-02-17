// MQTT Broker

var mosca = require('mosca')
var settings = { port: 8083 }
var broker = new mosca.Server(settings)

//MYSQL

var mysql = require('mysql')
var db = mysql.createConnection({
    host: 'YOUR_HOST',
    user: 'YOUR_USER',
    password: 'YOUR_PASSWORD',
    database: 'mqttJS'
})

var del = db._protocol._delegateError;
db._protocol._delegateError = function (err, sequence) {
    if (err.fatal) {
        console.trace('fatal error: ' + err.message);
    }
    return del.call(this, err, sequence);
};

db.connect(() => {
    console.log('Database connected...')
})

broker.on('ready', () => {
    console.log('Broker Is Ready!')
})



broker.on('published', (packet) => {
    message = packet.payload.toString()
    var dis = broker.on('clientDisconnected', () => {
        console.log('client is disconnected!')
    })
    if (dis) {
        let dbStatDis = 'insert into mqttJS set ?'
        let dataDis = {
            message: 'client is disconnected!'
        }
        db.query(dbStatDis, dataDis, (error, output) => {
            if (error) {
                console.log(error)
            }
            else {
                console.log('Data saved to mysql!')
            }
        })
    }
    console.log(message)
    if (message.slice(0, 1) != '{' && message.slice(0, 4) != 'mqtt') {
        let dbStat = 'insert into mqttJS set ?'
        let data = {
            message: message
        }
        db.query(dbStat, data, (error, output) => {
            if (error) {
                console.log(error)
            }
            else {
                console.log('Data saved to mysql!')
            }
        })
    }

})