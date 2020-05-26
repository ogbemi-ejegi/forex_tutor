const express = require('express');
const jwt = require('jsonwebtoken');
const {registrationValidation, loginValidation} = require('../validation');
const router = express.Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');

router.get('/registration', (req, res) => {
    res.render('registration');
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.post('/registration', async (req, res) => {
    const {error} = registrationValidation(req.body);
    if (error) return res.status(400).send(error.ValidationError);
 
    //Check if user already exist
    const userExist = await User.findOne({
        username: req.body.username
    })
    
    //Check if user already exist
    if (userExist) return res.status(400).send('Username already exist');
    const {username, email, password, password2} = req.body;

    //Check if password match
    if(password !== password2) return res.status(400).send('Passwords do not match');

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    const newUser = new User({
        username: username,
        email: email,
        password: hashedPassword
    });

    // Save user in database
    try {
        savedUser = await newUser.save();
        res.send({user_id: savedUser._id})
    } catch (error) {
        res.status(400).send(error);
    }

});


//router.get('/login', (req, res) => res.send('login'));
router.post('/loginUser', async (req, res) => {
    //validate before user creation
    const {email, password} = req.body;
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.ValidationError);

    //check if email exist
   const user = await User.findOne({email});
   if(!user) return res.status(400).send('Email or password incorrect');

   //check if password is correct
   const validPassword = await bcrypt.compare(req.body.password, user.password);
   if (!validPassword) return res.status(400).send("Password is incorrect");
   
   //create and assign token
   const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
   //the auth_token in the res.header below is just an identifier
//    res.header('auth_token', token).send(token);
//    res.send('Success');
    res.render('dashboard', {'auth_token': token})
 
});


module.exports = router;