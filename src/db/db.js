//This file creates defines db connectivity
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
.then(() => {console.log('Connected to Database')})


mongoose.connection.on('error', (err) => {
    console.error.apply(`Mongoose connection error: ${err}`)
})