const express = require('express') 
const router = express.Router();

const users = [{"username": "nameValue", "gender": 'female','email':'eeee@getMaxListeners.com','phone':'078333224'},{"username": "nameValue2", "gender": 'male','email':'eeee@example.com','phone':'0783222224'}]

router.get('/users',(req,res) =>{
res.set('Access-Control-Allow-Origin', '*');
 res.json(users)

})

module.exports = router