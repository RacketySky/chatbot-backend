const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const app = express()

dotenv.config()

const connectDatabase = require('./src/database/db')

const port = process.env.PORT || 9000

const userRoute = require('./src/routes/user.routes')
const authRoute = require('./src/routes/auth.route')
const questionRoute = require('./src/routes/question.route')

connectDatabase();
app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
    res.status(200).send('alive')
})

app.use('/users', userRoute)
app.use('/auth', authRoute)
app.use('/questions', questionRoute)

app.listen(port, () => console.log(`listening on port ${port}`))