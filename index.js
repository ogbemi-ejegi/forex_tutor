const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();

//Routes 
const userRoute = require('./routes/user');
const dashRoute = require('./routes/dashboard');

//handlebar middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Set static folder
app.use(express.static(`${__dirname}/public`));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Routes
app.use('/user', userRoute);
app.use('/', dashRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> {
    console.log(`App started at port ${PORT}`)
});
