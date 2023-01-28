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
const notes_url = require('./routes/notes');
app.use('/api/notes',notes_url);

app.listen(port, ()=> {
    console.log(`Server listning at http://localhost:${port}`);
})