const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/Auth')

require('dotenv').config()

const app = express()

app.use(express.json())

app.use('/api/v1/auth' , authRoutes)
// app.use('/api/v1/lecturer' , lecturerRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(()=> {
        console.log('Database Connected')

        app.listen(process.env.PORT , () => {
            console.log(`App is listening on port ` , process.env.PORT)
        })

    })
    .catch((error) => {
        console.log(error)
    })