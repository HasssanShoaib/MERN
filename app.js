const express = require('express');
const app = express();
const port = process.env.port;
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const db = require('./src/db/db');
const users = require('./src/routes/users');
const students = require('./src/routes/students');

//const mongoose = require('mongoose')

app.use(bodyParser.json())
//app.use(userRouter)

app.use('/users', users);

//Route defined for default
app.get('/', 
function(req, res) {
    res.json({"tutorial" : "Build Rest APIs for Student Database"})
})

app.use('/students', validateUser, students)

function validateUser(req, res, next) {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, process.env.JWT_KEY)
        if(!data) {
            throw new Error()
        }
        next()
    } catch (error) {
        res.status(401).send({error: 'Not authorized to access this resource'})
    }
}

//Start listening at port
app.listen(port, () =>{
    console.log(`Server Listening on ${port}`)
})

