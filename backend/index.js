const connectToMongo = require('./db');
const express = require('express')

connectToMongo();

const app = express();
const port = 5000;

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world')
})

// Routes
const auth_url = require('./routes/auth');
app.use('/api/auth',auth_url);
// app.use('/api/notes', require('./routes/notes'));

app.listen(port, ()=> {
    console.log(`Server listning at http://localhost:${port}`);
})