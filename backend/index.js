const connectToMongo = require('./db');
const express = require('express')

connectToMongo();

const app = express()
const port = 3000;

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world')
})

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, ()=> {
    console.log(`Server listning at http://localhost:${port}`);
})