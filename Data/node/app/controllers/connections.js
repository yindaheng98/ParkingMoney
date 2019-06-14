let mysql = require('mysql');
let redis = require('redis');

function Connection() {
    this.mysql = mysql.createConnection({
            host: 'localhost',
            user: 'CarsData',
            password: 'CarsData',
            port: '3306',
            database: 'CarsData'
        });
    this.mysql.connect();
    this.redis = redis.createClient(6379,'localhost');
}

module.exports = new Connection();
