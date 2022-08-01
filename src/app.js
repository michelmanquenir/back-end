const express = require('express');
const app = express();
const cors = require('cors');

app.set('port', process.env.PORT || 5000);

//middleware
app.use(cors());
app.use(express.json());


//routes
app.use('/api/user', require('./routes/user'));



module.exports = app;