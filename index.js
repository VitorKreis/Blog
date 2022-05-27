//Requires
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./DataBase-Mysql/Connection')
const session = require('express-session')

//Requires dos Controllers
const categoriesCont = require('./Categories/CategoriesController')
const articlesCont = require('./Articles/ArticleController')
const userCont = require('./Users/UserController')

//Iniciando a Category e o Article
const Article = require('./Articles/Article')
const Category = require('./Categories/Category');
const User = require('./Users/User')



//Ejs
app.set('view engine', 'ejs')
app.use(express.static('public'))


//Body-Parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//DataBase MySql
connection.authenticate().then(() =>{
    console.log('Conexao iniciada com sucesso')
})

//Congf cookies e seçoes
app.use(session({
    secret: "orl,vçfdshkckdsjeipwy",
    cookie: {maxAge: 30000}
}))




//Rotas
app.get('/', (req, res) =>{
    Article.findAll({order:[
        ['id', 'DESC']
    ],include:[{
        model: Category
    }],
    limit: 5}).then(articles =>{
        Category.findAll({}).then(categories =>{
            res.render('index', {articles : articles, categories: categories})
        })
    })
})


app.get('/:slog', (req,res) =>{
    var slog = req.params.slog
    Article.findOne({where:{
        slog : slog
    }}).then(articles =>{
        if(articles != undefined){
            Category.findAll().then(categories =>{
                res.render('article', {articles : articles, categories: categories})
            })
        }else{
            res.redirect('/')
        }
    })
})

app.get('/categoria/:slog', (req,res) =>{
    var slog =  req.params.slog

    Category.findOne({
        where:{ slog : slog},
        include:[{model: Article}]
    }).then(category =>{
        Category.findAll().then(categories =>{
            res.render('index', {articles : category.articles, categories : categories})
        })
    })
})

app.use('/', categoriesCont)

app.use('/', articlesCont)

app.use('/', userCont)


//Conexao com a internet
app.listen('2020', ()=>{
    console.log('O servidor foi iniciado')
})