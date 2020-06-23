require('dotenv').config()
const path = require('path')
const express = require('express')
const PORT = process.env.PORT || 4000
const app =  express()
const csv = require('csvtojson')
const fs = require('fs')

app.use(express.json())
app.use(express.static(path.join(__dirname,'assets')))
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')

let dirPath = path.resolve(__dirname,'assets/file')
let filecsv = null, filejson = null

app.get('/',(req,res) => res.render('home'))
app.get('/csv',(req,res) => {
    fs.readdir(dirPath, (err,files)=> {
        if(err) res.send({ error: true, message: 'There is no csv file or incorrect path...'})
        files.forEach(file => {
            if(path.extname(file).toLowerCase() === '.csv')  filecsv = file
        })
        if(filecsv !== null ){
            csv().fromFile(path.join(dirPath,filecsv))
            .then(csv => {
                csv.sort((a, b) => parseFloat(b["TOTAL POINTS"]) - parseFloat(a["TOTAL POINTS"]) );
                res.send(Object.assign({ error: false }, {data : csv} ))
            })
        } else res.send({ error: true, message: 'There is no csv file...'})
    })
})

fs.readdir(dirPath, (err,files)=> {
    files.forEach(file => {
        if(path.extname(file).toLowerCase() === '.csv')  filecsv = file
    })
    if(filecsv !== null ){
        csv().fromFile(path.join(dirPath,filecsv))
        .then(csv => {
            let data = JSON.stringify(csv);
            const filename = filecsv.split('.').slice(0, -1).join('.')
            fs.writeFileSync(path.join(dirPath,filename+".json"), data);
        })
    }
})

app.get('/json',(req,res) => {
    fs.readdir(dirPath, (err,files)=> {
        if(err) res.send({ error: true, message: 'There is no csv file or incorrect path...'})
        files.forEach(file => {
            if(path.extname(file).toLowerCase() === '.json')  filejson = file
        });
        if (filejson !== null) {
            let rawdata = fs.readFileSync(path.join(dirPath,filejson))
            let jsondata = JSON.parse(rawdata.toString())
            jsondata.sort((a, b) => parseFloat(b["TOTAL POINTS"]) - parseFloat(a["TOTAL POINTS"]) );

            res.send(Object.assign({ error: false }, { data: jsondata } ))
        } else res.send({ error: true, message: 'There is no csv file...'})
    })
})


// Handle the errors, without the route identification ==> '/'
app.use((req, res, next) => {
    res.status(404).render('errorHandler', { routError: 'Sorry, this route cannot be accessed...' })
})

// Set SERVER ON
app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`))

