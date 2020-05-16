const express = require('express');
const jwt = require('jsonwebtoken');
const {registrationValidation, loginValidation} = require('../validation');
const router = express.Router();
const User = require('../model/User');

router.get('/registration', (req, res) => {
    res.render('registration');
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.post('/addUser', async (req, res) => {
    //console.log(req.body);
    const{name, email, password, password2} = req.body;
    const error = registrationValidation(req.body);
    if (error) {
        console.log(error);
        //res.send(error.details[0].message);
        res.send(error.ValidationError)
    }

    if(password !== password2) return res.status(400).send('Passwords do not match');

    //Check if email exist
    const emailExist = await User.findOne({
        email
    });
    if (emailExist) {
        return res.status(400).send('Email already exist');
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    //if no error, create user
        const user = new User({
        name,
        email,
        password: hashedPassword
    });

    try {
        const savedUser = await user.save();
        res.send({user: user._id});
    } catch (error) {
        res.status(400).send(error);
    }
})

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
   res.header('auth_token', token).send(token);
   res.send('Success');
});


module.exports = router;