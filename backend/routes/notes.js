const express = require('express');
const router = express.Router();
const Notes = require('../models/Note');
let fetchuser = require('../middleware/fetchUser');
const { check, validationResult } = require('express-validator');
router.use(express.json());


// Route 1: Get all notes using : 'GET /api/notes/allnotes , Login required
router.get('/allnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes);
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Some error occured.');

    }
})

router.get('/addnote', (req, res) => {
    console.log("connected");
    res.json({ "status": "connected" })
})

// Route 2: Add a new note using : 'POST /api/notes/addnote , Login required
router.post('/addnote',
    [check('title', 'Title must be atleast 3 characters long!').isLength({ min: 3 }),
    check('description', 'Description must be atleast 3 characters long!').isLength({ min: 5 })],
    fetchuser, async (req, res) => {
        // console.log(req.header('auth-token'));
        try {
            console.log(req.body.title);
            const { title, description, tag } = req.body;

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            // if no errors, create a new note.
            const note = new Notes({ title, description, tag, user: req.user.id });
            const savedNote = await note.save();
            res.json(savedNote);
        } catch (error) {
            console.log(error.message)
            res.status(500).send('Some error occured.');
        }
    })


router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {

        const { title, description, tag } = req.body;
        // create a temporary note
        let newNote = {}
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note to be updated
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found!") };

        if (note.user.toString() != req.user.id) {
            return res.status(401).send("Not Allowed!");
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Some error occured.');
    }
})


router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be deleted
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found!") };

        // Check if note belongs to the requested user.
        if (note.user.toString() != req.user.id) {
            return res.status(401).send("Not Allowed!");
        }   

        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ success: "Succcess: Note deleted successfully!", note:note });
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Some error occured.');
    }
})


module.exports = router