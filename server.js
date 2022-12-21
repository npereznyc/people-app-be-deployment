const express = require('express')
const app = express()

//app dependancies:
const cors = require('cors')
const morgan = require('morgan')

//controller imports:
const peopleController= require('./controllers/people-controller')

require('dotenv').config()
require('./config/db.connection')
//when we require like this, node runs all of the code inside db.connection

const { PORT } = process.env

//express / app middleware:
app.use(express.json()) //makes it so that our server can receive json data, parse it, and send it to the routes that might need it. Otherwise, we'll get 'undefined'.

//cors helper function:
app.use(cors()) //allows for cross origin requests; like an open channel. So that all services have access (heroku, netlify, etc.)

//morgan request logger (for dev) - this will show up in the console:
app.use(morgan('dev'))

//router middleware:
app.use('/people', peopleController)
//when a request is incoming for /people, then run the popleController function and pass the request through our router

//root - home/index route redirects to the people index route
app.get('/', (req, res) => res.redirect('/people')
)


app.listen(PORT, ()=> {
    console.log(`listening on port ${PORT}`)
})