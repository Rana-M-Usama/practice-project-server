const mySql = require('mySql');


const connection = mySql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1234567890',
    database: 'practice-project'


});
connection.connect((err) => {
    if (err) {
        console.log('Not connected');

    }
    else {

        console.log('Connected');


    }


});
module.exports = connection;