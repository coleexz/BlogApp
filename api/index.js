const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const User = require('./models/User');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

//cors: es un middleware que permite que el servidor pueda recibir peticiones de otros servidores
app.use(cors());
app.use(express.json());

require('dotenv').config({ path: './.env' });
console.log('MONGO_URI:', process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));

//routes: es un conjunto de rutas que se pueden acceder desde el navegador
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc = await User.create({
            username,
            password: bcrypt.hashSync(password, salt),
        });

        res.json(userDoc); // Send the user document back to the client
    } catch (error) {
        res.status(400).json({ error: 'Registration failed', details: error.message });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

        const userDoc = await User.findOne({username})
        res.json(userDoc);
});

app.listen(4000);
