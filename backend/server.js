const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser');
require("dotenv").config()
const userRoutes = require('./router/userRoutes')

app.use(express.json())

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected To DB");
}).catch((error) => {
    console.log("MongoDB Error:",error);
})

app.use(cookieParser());
app.use('/api', userRoutes)


app.listen(process.env.PORT, () => {console.log(`Server is running on port ${process.env.PORT}`)})