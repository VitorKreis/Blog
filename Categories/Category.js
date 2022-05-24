const Sequelize = require('sequelize')
const connection = require('../DataBase-Mysql/Connection')
const Article = require('../Articles/Article')


const Category = connection.define('categories', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slog:{
        type: Sequelize.STRING,
        allowNull: false
    }
})



Category.hasMany(Article)
Article.belongsTo(Category)



module.exports = Category;