const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
var bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
let fetchuser = require('../middleware/fetchUser');


router.use(express.json());

const JWT_SECRET = 'amit'

// Route 1 - Register a new user
router.post('/register', [
    check('name', 'Name must be atleast 3 characters long!').exists().isLength({ min: 3 }),
    check('email', 'Invalid email!').exists().isEmail().normalizeEmail(),
    check('password', 'Name must be atleast 3 characters long!').exists().isLength({ min: 3 })],
    async (req, res) => {
        // If there are errors,  return bad request and errors.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Check if user already exists with this email.
        let success = false;
        try {
            let oldUser = await User.findOne({ email: req.body.email });
            if (oldUser) {
                return res.status(400).json({success, error: "Sorry! User with same email already exists." })
            }

            // Genarate hashed password
            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(req.body.password, salt);

            // Create new user.
            let newUser = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: hashedPass,
            })

            const data = {
                user: {
                    id: newUser.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET, { expiresIn: '1h' });
            success = true;
            res.json({success, authToken });
            
        } catch (error) {
            console.log(error.message)
            res.status(500).send('Some error occured.');
        }
    })
    
    
    // Route 2 - Login user
    router.post('/login', [check('email', 'Invalid email!').isEmail(),
    check('password', "Password can't be blank").exists()],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(500).json({ error: errors.array() });
        }
        
        const { email, password } = req.body;
        success = false;
        try {
            let user = await User.findOne({ email: email });
            // console.log(user)
            if (!user) {
                return res.status(400).json({success, error: "Invalid credentials" });
            }

            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({success, error: "Invalid pass credentials" });
            }

            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            success=true;
            res.json({success, authToken });

        } catch (error) {
            console.log(error.message)
            res.status(500).send('Some error occured.');
        }
    })

// Route 2 - Get details about Logged-in users. // Login required
router.post('/getuser',fetchuser, async (req, res) => {
    try {
        let userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        res.send(user);
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Some error occured.');
    }
})



router.get('/register', (req, res) => {
    res.send('New User Registration page.')
})

module.exports = router