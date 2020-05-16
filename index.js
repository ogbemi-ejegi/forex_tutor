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

const PORT = 5000 || process.env.PORT;
app.listen(PORT, ()=> {
    console.log(`App started at port ${PORT}`)
});
