let mysql = require('mysql');
let redis = require('redis');

function Connection() {
    this.mysql = mysql.createConnection({
            host: 'mysql',
            user: 'CarsData',
            password: 'CarsData',
            port: '3306',
            database: 'CarsData'
        });
    this.mysql.connect();
    this.redis = redis.createClient(6379,'redis');
}

module.exports = new Connection();
