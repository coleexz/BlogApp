const express = require('express');
const app = express();

//routes: 
app.get('/register', (req, res) => {
    res.send('TE AMO GEOVANNA!');
});

app.listen(4000);
