const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const User = require('./models/User')
const bctypt =require('bcrypt')
require('dotenv').config()
const app = express();


const bcryptSalt = bctypt.genSaltSync(10)

app.use(express.json());

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))


mongoose.connect(process.env.MONGO_URL)

app.get('/test',(req, res) => { 
    res.send('Hello World')
})

app.post('/register', async(req, res) => {   
    const { name, email, password } = req.body;
    try{
        const userdetails = await User.create({
            name,
            email,
            password: bctypt.hashSync(password, bcryptSalt)
        });
        res.json(userdetails)
    }catch (e) {
            res.status(422).json(e)
    }
    
}) 

app.listen(8080)