
const express = require('express')
const router = express.Router()
const user = require('./User')
const bcrypt = require('bcryptjs')


router.get('/admin/users', (req,res) =>{
    user.findAll().then(users =>{
        res.render("admin/user/index", {users : users})
    })
})

router.get('/admin/create/user', (req,res)=>{
    res.render('admin/user/userCreate')
})

router.post('/user/create', (req, res) =>{
    var email = req.body.email
    var password = req.body.password

    user.findOne({where:{
        email : email
    }}).then((email) =>{
        if(email == undefined){
            var salt = bcrypt.genSaltSync(10)
            var hash = bcrypt.hashSync(password + salt)

            user.create({
                email : email,
                password : hash
            }).then(() =>{
                res.redirect('/')
            }).catch(err =>{
                res.redirect('/')
            })
            
        }else{
            res.redirect('/admin/create/user')
        }
    })



})


module.exports = router;
