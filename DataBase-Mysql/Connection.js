const Sequileze = require('sequelize')


const connection = new Sequileze('Blog', 'root', 'vitor2309', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
})

module.exports = connection

