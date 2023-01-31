const mongoose = require('mongoose')

const connectDatabase = () => {
    console.log('Trying to connect to the database')

    mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Connected to database'))
        .catch( err => console.log(err))
}

module.exports = connectDatabase