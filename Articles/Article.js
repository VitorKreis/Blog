const Sequelize = require('sequelize')
const connection = require('../DataBase-Mysql/Connection')


const Article = connection.define('articles', {
    title:{
        type: Sequelize.STRING,
        allowNull: false 
    },
    slog:{
        type: Sequelize.STRING
    },
    body:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    categoryId:{
        type: Sequelize.INTEGER,
        allowNull: false
    }

})




module.exports = Article;