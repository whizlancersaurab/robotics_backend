const express = require('express')
const cors = require('cors')
require('dotenv').config()
const errorMiddleware = require('./middleware/errorMiddlware')

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(
    cors({
        origin: process.env.CORS_URL || "*",
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    })
);

app.use(errorMiddleware)
app.use('/api', require('./routes/routes'))


app.listen(PORT, () => { console.log(`server is listen on PORT ${PORT}`) })