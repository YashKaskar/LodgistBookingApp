const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
require('dotenv').config()
const app = express();

app.use(express.json());

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))


mongoose.connect(process.env.MONGO_URL)

app.get('/test',(req, res) => { 
    res.send('Hello World')
})

app.post('/register', (req, res) => {   
    const { name, email, password } = req.body;
    
}) 

app.listen(8080)