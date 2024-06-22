const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/userModel")
const jwt = require('jsonwebtoken');


router.post('/signup', async (req, res) => {
    try {
      // Check if email already exists
      let user = await User.findOne({ email: req.body.email });
  
      if (user) {
        return res.status(400).json({ email: 'Email already exists' });
      }
  
      // Create a new user instance
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        dob: req.body.dob
      });
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(newUser.password, salt);
  
      // Save the new user
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

router.post('/signin', async (req, res) => {
    const email= req.body.email;
    const password= req.body.password;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        
        const payload = { userId: user._id };

        
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (err) {
        
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;