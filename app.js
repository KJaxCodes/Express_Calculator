const express = require('express');

//express app setup
const app = express();

// register view engine
app.set('view engine', 'ejs');

//listen for requests
app.listen(3000, () => {
    console.log('Server running on port 3000');
});

//define our routes
app.get('/', (req, res) => {
    console.log('This is home')
    res.render('index', { title: 'Home' });
});

// Create 3 pages: Mean, Median, Mode
// On each page, there is a form to input up to 10 numbers, error if the value entered is not a number, require at least 2 numbers
// Calculate button takes the numbers entered and gives response


//can use arrow functions, but sometimes you want to name the function:
app.get('/mean', function calcMean(req, res) {
    res.send('You wnat to find the mean!');
});

const greetings = {
    en: 'hello',
    fr: 'bonjour',
    ic: 'hallo',
    js: 'konnichiwa'
}