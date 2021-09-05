const path = require('path')
const express = require('express');

const weather = require('./utils');


const app = express();
const port = process.env.PORT || 8080;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')



// Setup static directory to serve
app.use('/', express.static(publicDirectoryPath));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.get('/getweather', (req, res) => {
    const search = req.query.city;
    weather.getCity(search, data => {
        console.log(data)
        res.send(data);
    });
    // res.send('<p> This is weather</p>')
})

// app.use('/', (req, res) => {
//     res.render('index.html')
// })




app.listen(port, () => {
    console.log('Server is up on port .' + port)
})