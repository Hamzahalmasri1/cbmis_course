const express = require('express'); 
const db = require('../database/models');
const router = express.Router();


router.get('/all',(req,res) =>{
res.set('Access-Control-Allow-Origin', '*');
 db.User.findAll().then(users => res.send(users))
})

module.exports = router