require('dotenv').config()
const path = require('path')
const express = require('express')
const PORT = process.env.PORT || 4000
const app =  express()


app.use(express.json())
app.use(express.static(path.join(__dirname,'assets')))
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')


app.get('/',(req,res) => res.render('home'))


// Handle the errors, without the route identification ==> '/'
// app.use((req, res, next) => {
//     res.status(404).render('pages/errorHandler', { routError: 'Sorry, this route cannot be accessed...' })
// })

// Set SERVER ON
app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`))

