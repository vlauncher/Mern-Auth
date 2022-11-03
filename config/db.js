const { Sequelize } = require('sequelize');

const database = new Sequelize({
    dialect:'sqlite',
    storage:'mern_auth.sqlite3'
})

database.sync();

module.exports = database;