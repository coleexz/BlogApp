const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const User = require('./models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config({ path: './.env' });
const salt = bcrypt.genSaltSync(10);
const secret = 'alkjfhalsdjlkasjdjksaskldjaklsdkadfas';

// Middlewares
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

app.use(express.json());
app.use(cookieParser());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));

// Registration route
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc = await User.create({
            username,
            password: bcrypt.hashSync(password, salt),
        });

        res.json(userDoc);
    } catch (error) {
        res.status(400).json({ error: 'Registration failed', details: error.message });
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const userDoc = await User.findOne({ username });

    if (!userDoc) {
        return res.status(400).json({ error: 'User not found' });
    }

    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
        jwt.sign({ id: userDoc._id, username: userDoc.username }, secret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token, { httpOnly: true }).json({
                id:userDoc._id,
                username,
             });
        });
    } else {
        res.status(400).json({ error: 'Wrong credentials' });
    }
});

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, (err, info) => {
        if (err) {
            return res.status(400).json({ error: 'Invalid token' });
        }
        res.json(info);
    });
});

app.post('/logout',(req,res)=>{
    res.cookie('token','').json('ok');
})

app.listen(4000,  () => {
    console.log('Server running on http://localhost:4000');
});
