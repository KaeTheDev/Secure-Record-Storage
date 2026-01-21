const router = require('express').Router();
const { Note } = require('../../models');
const { authMiddleware } = require('../../utils/auth');
 
// Apply authMiddleware to all routes in this file
router.use(authMiddleware);
 
// GET /api/notes - Get all notes for the logged-in user
// THIS IS THE ROUTE THAT CURRENTLY HAS THE FLAW
router.get('/', async (req, res) => {
  // This currently finds all notes in the database.
  // It should only find notes owned by the logged in user.
  try {

    if(!req.user){
      return res.status(401).json({ message: "You must be logged in to view notes." });
    }
    const notes = await Note.find({ user: req.user._id });
    res.json(notes);
  } catch (err) {
    res.status(500).json(err);
  }
});
 
// POST /api/notes - Create a new note
router.post('/', async (req, res) => {
  try {
    // Make sure user exists
    if(!req.user) {
      return res.status(401).json({ message: "You must be logged in to create a note." });
    }
    const note = await Note.create({
      ...req.body,
      // The user ID needs to be added here / connects note to logged in user
      user: req.user._id,
    });
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json(err);
  }
});
 
// PUT /api/notes/:id - Update a note
router.put('/:id', async (req, res) => {
  try {
    if(!req.user) {
      return res.status(401).json({ message: "You must be logged in to update a note." });
    }
   // Find the note by ID
   const note = await Note.findById(req.params.id);
   if (!note) {
     return res.status(404).json({ message: 'No note found with this id!' });
   }

   // Check if the logged-in user is the owner of the note
   if (note.user.toString() !== req.user._id.toString()) {
     return res.status(403).json({ message: 'User is not authorized to update this note.' });
   }

   // Update the note
   Object.assign(note, req.body); // merge req.body into the note
   await note.save();

   res.json(note);
 } catch (err) {
   console.error(err);
   res.status(500).json({ message: 'Server error', error: err });
 }
});
 
// DELETE /api/notes/:id - Delete a note
router.delete('/:id', async (req, res) => {
  try {

    if(!req.user) {
      return res.status(401).json({ message: "You must be logged in to delete this note." });
    }

    // This needs an authorization check
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'No note found with this id!' });
    }
    
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'User is not authorized to delete this note.' });
    }
    await note.deleteOne();

    res.json({ message: 'Note deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
});
 
module.exports = router;