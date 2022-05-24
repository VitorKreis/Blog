const express = require('express')
const router = express.Router()
const category = require('./Category')
const slugify = require('slugify')




router.get('/admin/categorie/new', (req,res) =>{
    res.render('../views/admin/category/categoryNew')
})


router.post('/categories/save', (req, res)=>{
    var title = req.body.title

    if( title != undefined){
        category.create({
            title: title,
            slog: slugify(title)
        }).then(()=>{
            res.redirect('/admin/categories')
        })

    }else{
        res.redirect('/admin/categorie/new')
    }
})

router.get('/admin/categories', (req, res) =>{
    category.findAll().then(categories =>{
        res.render('../views/admin/category/index.ejs', {categories: categories})
    })
    
})


router.post('/admin/category', (req,res) =>{
    var id = req.body.id

    if(id != undefined){
        if(!isNaN(id)){

            category.destroy({
                where:{
                    id : id
                }
            }).then(()=>{
                res.redirect("/admin/categories")
            })

        }else{
            res.redirect("/admin/categories")
        }
    }else{
        res.redirect("/admin/categories")
    }

})

router.get('/admin/edit/:id', (req,res) =>{
    var id = req.params.id

    if(isNaN(id)){
        res.redirect('/admin/categories')
    }

    category.findByPk(id).then(category =>{
        if(category != undefined){

             res.render("../views/admin/category/edit.ejs", {category: category})

        }else{

            res.redirect("/admin/categories")
            
        }
    }).catch(err =>{

        return res.status(400).redirect("/admin/categories")
        console.log(err)

       
    })
})

router.post('/categories/update', (req,res)=>{
    var id = req.body.id
    var title = req.body.title

    category.update({title: title, slog: slugify(title)}, {
        where:{
            id : id
        }
    }).then(() =>{
        res.redirect("/admin/categories")
    })
})

module.exports = router;