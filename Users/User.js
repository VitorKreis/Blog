const Sequelize = require('sequelize')
const connection = require('../DataBase-Mysql/Connection')


const User = connection.define('Users', {
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

User.sync({force: false})




module.exports = User;