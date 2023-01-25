const mongoose = require('mongoose');

const uri = "mongodb://localhost:27017/notes";


// mongoose.set("strictQuery", false);


const connectToMongo = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/inotebook').
    catch(error => handleError(error));
}

module.exports = connectToMongo;