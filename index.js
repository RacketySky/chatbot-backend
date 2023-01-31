const express = require('express')
const dotenv = require('dotenv')
const app = express()


dotenv.config()

const connectDatabase = require('./src/database/db')

const port = process.env.PORT || 9000  

connectDatabase();
app.use(express.json());
app.get('/', (req, res) =>{
    res.status(200).send('alive')
})


app.listen(port, () => console.log(`listening on port ${port}`))