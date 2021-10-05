const express = require('express')
const app = express()
const schemas = require('./routes/schema')
var { graphqlHTTP } = require('express-graphql');


var bodyParser = require('body-parser')

var urlencodedParser = bodyParser.urlencoded({ extended: true })
const { body, validationResult } = require('express-validator');


app.use(express.static('public'))
app.set('view engine','ejs')
const port = 4000

const db = require('./database/models')

// db.connect()



app.get('/', (req, res) => {
  res.render('home')
})

app.post('/',urlencodedParser , body('email').isEmail(),
// password must be at least 5 chars long
body('password').isLength({ min: 5 }).withMessage('must be at least 5 chars long').matches(/\d/).withMessage('must contain a number'),body('username').isLength({ min: 5 }).withMessage('must be at least 5 chars long'),body('phone').matches(/^(077|078|078)\d{7}$/).withMessage('The phone number should be jordanian start with 077, 078, 079'), (req, res) => {
  const errors = validationResult(req);

  
    if (!errors.isEmpty()) {
      const alert = errors.array()
      return res.render('home', {
        alert
    })
  }
      
  let context=req.body
 
  res.render('success-post', {context})
})

const apiUser = require('./routes/api')
app.use('/api',apiUser)


app.use('/graphql', graphqlHTTP({
  schema: schemas,
  pretty:true,
  graphiql: true,
}));

db.sequelize.sync().then(function() {
  app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
  })
});


