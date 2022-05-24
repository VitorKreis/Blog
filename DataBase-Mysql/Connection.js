const Sequileze = require('sequelize')


const connection = new Sequileze('Blog', 'root', 'Vitor2309', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
})

module.exports = connection

