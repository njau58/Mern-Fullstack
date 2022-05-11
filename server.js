const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
const bodyParser = require("body-parser");
const port = process.env.PORT
const app = express()
const dbURI =process.env.URI
const routes = require('./routes/router')
const cors = require('cors')
const path = require('path')


//middlewares

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.set('view engine', 'ejs')

app.use(cors());


//routes
app.use('/api', routes)


//connection to database
mongoose.connect(dbURI)
.then(result=>{

    app.listen(port,()=>console.log(`Server running on port ${port}`))

})
.catch(error=>console.log(error))


// Serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')))
  
    app.get('*', (req, res) =>
      res.sendFile(
        path.resolve(__dirname, 'client', 'build', 'index.html')
      )
    )
  } else {
    app.get('/', (req, res) => res.send('Please set to production'))
  }