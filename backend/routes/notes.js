const express = require('express');
const router = express.Router();


router.get('/', (req,res)=> {
    obj = {
        title:'OS Notes',
        description:'Operating System notes from unit 1 to 5.'  
    }
    res.json(obj);
})

module.exports = router