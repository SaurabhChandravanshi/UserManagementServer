const express = require('express');
const connectToMongo = require('./db');
const app = express();
const cookieParser = require('cookie-parser')
const port = process.env.PORT || 4000;
const cors = require('cors');

connectToMongo();
app.use(express.json())
app.use(cors())

app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api', require('./routes/apiRoutes'));

app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello from Express');
})

app.listen(port, () => {
    console.log('Server Running on Port', port)
})