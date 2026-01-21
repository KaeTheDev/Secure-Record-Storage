const router = require('express').Router();
const User = require('../../Models/User'); 
const { signToken } = require('../../utils/auth');

// POST /api/users/register - Create a new user
router.post('/register', async (req, res) => {
  try {
    const user = await User.create(req.body);
    console.log('USER CREATED:', user); // debug

    // generate a token
    const token = signToken(user);

    // return both user and token
    res.status(201).json({ token, user });
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

    // Generate a JWT token
    const token = signToken(user);

    // Return both token and user
    res.json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err });
  }
});

module.exports = router;