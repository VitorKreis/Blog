const express = require('express')
const router = express.Router()
const category = require("../Categories/Category")
const Article = require("../Articles/Article")
const slugfy = require('slugify')


router.get('/admin/articles', (req,res)=>{
   Article.findAll({
       include:[{
           model: category
       }]
   }).then(articles=>{
       res.render('../views/admin/articles/index.ejs', {articles: articles})
   })
})

router.get("/admin/newArticle", (req,res) =>{

    category.findAll().then((categories) => {
        res.render('../views/admin/articles/new', {categories: categories})
    })
    
})

router.post('/article/save', (req,res) =>{
    var title = req.body.title
    var body = req.body.body
    var id = req.body.category


    Article.create({
        title: title,
        slog:  slugfy(title),
        body: body,
        categoryId: id
    }).then(()=>{
        res.redirect("/admin/articles")
    })
})


router.post('/admin/delet/article', (req,res) =>{
    var id = req.body.id

    if(id != undefined){
        if(!isNaN(id)){

            Article.destroy({
                where:{
                    id : id
                }
            }).then(()=>{
                res.redirect("/admin/articles")
            })

        }else{
            res.redirect("/admin/articles")
        }
    }else{
        res.redirect("/admin/articles")
    }

})

router.get('/admin/uptade/:id', (req,res) =>{
    var id = req.params.id

    if(!isNaN(id)){
        Article.findByPk(id).then(articles =>{
            category.findAll().then(categories =>{
                res.render('../views/admin/articles/edit.ejs', {articles : articles, categories : categories})
            })
        })
        
    }
})


router.post('/admin/uptade/article', (req,res) =>{
    var id = req.body.id
    var title = req.body.title
    var body = req.body.body
    var category =  req.body.category

    Article.update({title : title, body: body, categoryId : category,  slog : slugfy(title)}, {
        where:{
            id : id
        }
    }).then(()=>{
        res.redirect("/admin/articles")
    })
})


router.get('/articles/page/:num', (req,res) =>{
    var page = req.params.num
    var offset = 0;

    if(isNaN(page) || page == 0){
        offset = 0
    }else{
        offset = (parseInt(page) -1) * 4
    }

    Article.findAndCountAll({
        limit: 4,
        offset: offset,
        order:[
            ['id', 'DESC']
        ]
    }).then(articles =>{

        var next;
        if (offset + 4 >= articles.count){
            next = false;
        }else{
            next = true;
        }

        var result = {
            page : parseInt(page),
            next : next,
            articles : articles
        }

        category.findAll().then(categories =>{
            res.render("../views/admin/articles/page.ejs", {result : result, categories : categories})
        })

    })
})


module.exports = router;