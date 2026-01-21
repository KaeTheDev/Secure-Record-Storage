const router = require('express').Router();
const User = require('../../Models/User'); 

// POST /api/users/register - Create a new user
router.post('/register', async (req, res) => {
  try {
    const user = await User.create(req.body);
    console.log('USER CREATED:', user); // debug
    res.status(201).json({ user }); // optionally include token if you have signToken
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Failed to create user', error: err });
  }
});

// POST /api/users/login - Authenticate a user and return a token
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "Can't find this user" });
    }

    const correctPw = await user.isCorrectPassword(req.body.password);
    if (!correctPw) {
      return res.status(400).json({ message: 'Wrong password!' });
    }

    res.json({ user }); // optionally include token
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err });
  }
});

module.exports = router;