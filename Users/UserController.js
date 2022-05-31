
const express = require('express')
const router = express.Router()
const User = require('./User')
const bcrypt = require('bcryptjs')
const adminAuth = require('../Middleware/adminMiddleware')


router.get('/admin/users', adminAuth, (req,res) =>{
    User.findAll().then(users =>{
        res.render("admin/user/index", {users : users})
    });
});

router.get('/admin/create/user',(req,res)=>{
    res.render('admin/user/userCreate')
});

router.post('/user/create', (req, res) =>{
    var email = req.body.email
    var password = req.body.password

    User.findOne({where:{
        email : email
    }}).then((users) =>{
        if(users == undefined){
            var salt = bcrypt.genSaltSync(10)
            var hash = bcrypt.hashSync(password + salt)

            User.create({
                email : email,
                password : hash
            }).then(() =>{
                res.redirect('/admin/users')
            }).catch(err =>{
                console.log(err)
            })
            
        }else{
            res.redirect('/admin/create/user')
        }
    })
});


router.get('/admin/login', (req,res) =>{
    res.render('admin/user/login')
})


router.post('/authenticate',(req,res) =>{
    var email = req.body.email
    var password = req.body.password

    User.findOne({where:{
        email : email
    }}).then(user =>{
        if(user != undefined){

            var correct = bcrypt.compareSync(user.password, password);


            if (correct != undefined){ 

                req.session.user = {
                    id : user.id,
                    email : user.email
                }

                res.redirect('admin/articles')
            }else{
                res.redirect('/admin/login')
            }

        }else{
            res.redirect('/admin/login')
        }
    })

})

router.get('/logout', (req, res) =>{
    req.session.user == undefined;

    res.redirect('/')
})


module.exports = router;
