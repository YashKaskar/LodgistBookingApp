const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const User = require('./models/User')
const bctypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');

require('dotenv').config()
const app = express();


const bcryptSalt = bctypt.genSaltSync(10)
const jwtSecret = 'fruitmango2fruitkiwi2'

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'))

app.use(cors({
    credentials: true,
    origin: 'http://127.0.0.1:5173'
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

app.post('/login', async (req, res) => { 
    const { email, password } = req.body;
    const userdetails = await User.findOne({ email});
    if (userdetails) {  
        const passwordOk = bctypt.compareSync(password, userdetails.password);
        if (passwordOk) {
            jwt.sign({ email: userdetails.email, id: userdetails._id}, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(userdetails);
            })
        } else { 
            res.status(422).json('passwordNotok');
        }
    } else { 
        res.json('not found')
    }
})

app.get('/profile', (req, res) => { 
    const { token } = req.cookies;
    if (token) { 
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const {name, email, _id} = await User.findById(userData.id)
            res.json({name, email, _id})
        });
    } else {
        res.json(null)
    }
})

app.post('/logout', (req, res) => { 
    res.cookie('token', '').json(true);
})


app.post('/upload-by-link', async(req, res) => { 
    const { link } = req.body;
    const newName = 'photo' + Date.now() +  '.jpg'
    await imageDownloader.image({
        url: link,
        dest: __dirname + 'uploads/' + newName,
    })
    res.json(newName);
})

const photosMiddleWare = multer({dest : 'uploads/'})
app.post('/upload', photosMiddleWare.array('photos', 100), (req, res) => { 
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace('uploads', ''));
    }
 res.json(uploadedFiles)
})

app.listen(8080)