const express = require('express')
const PORT = process.env.PORT 
const dotenv = require('dotenv').config()
const app =  express()
const path = require('path')


app.use(express.json())
app.use(express.static(path.join(__dirname,'assets')))
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')


app.get('/me',(req,res) => res.send({name: "Moises WK"}))


// Handle the errors, without the route identification ==> '/'
// app.use((req, res, next) => {
//     res.status(404).render('pages/errorHandler', { routError: 'Sorry, this route cannot be accessed...' })
// })

// Set SERVER ON
app.listen(5000, () => console.log('Server is running...'))

