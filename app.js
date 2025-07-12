const express = require('express');

//express app setup
const app = express();

// register view engine
// app.set('view engine', 'ejs');
// not needed here

const PORT = 3000;

//listen for requests
app.listen(PORT, () => {
    console.log('Server running on PORT: ${PORT}');
});

//define our routes
app.get('/', (req, res) => {
    console.log('This is home')
    res.json({ message: "hello" });
});

// Create 3 pages: Mean, Median, Mode
// On each page, there is a form to input up to 10 numbers, error if the value entered is not a number, require at least 2 numbers
// Calculate button takes the numbers entered and gives response


//can use arrow functions, but sometimes you want to name the function:
app.get('/mean', async (req, res) => {
    //get the query
    const { nums } = req.query;

    //check if empty
    if (!nums) {
        return res.status(400).json({
            message: "Route GET /mean",
            operation: "mean",
            error: "Bad request, query param {nums} is required"
        })
    }

    // split the nums into an array
    const numbers = nums.split(",");



    let sum = 0;

    for (const stringNum of numbers) {
        //convert from string to number
        const number = parseInt(stringNum);
        if (isNaN(number)) {
            return res.status(400).json({
                message: `Error: ${stringNum} is not a valid integer`,
            });
        }
        sum += parseInt(stringNum);
    };

    const MEAN = sum / (numbers.length);

    res.json({
        message: "Route GET /mean",
        operation: "MEAN",
        value: MEAN
    });
});

app.get("/median", async (req, res) => {
    //get the query
    const { nums } = req.query;

    //check if empty
    if (!nums) {
        return res.status(400).json({
            message: "Route GET /mean",
            operation: "mean",
            error: "Bad request, query param {nums} is required"
        })
    }

    //split the nums into an array, split at the comma
    const splitValues = nums.split(",");
    const numValues = [];

    for (const val of splitValues) {
        if (Number.isNaN(Number(val))) {
            return res.status(400).json({
                message: "Route GET /median",
                operation: "median",
                error: `Bad request, query param [${val}] is not a valid number`
            });
        }
        numValues.push(Number(val));
    }

    //sort and calculate the median

    numValues.sort((a, b) => a - b);

    console.log(numValues);

    //get middle of the array
    const middle = Math.floor(numValues.length / 2)

    console.log(middle);

    let median = 0;

    if (numValues.length % 2 === 0) {
        median = (numValues[middle] + numValues[middle - 1]) / 2
    } else {
        median = numValues[middle];
    }


    return res.json({
        message: "Route GET /median",
        operation: "median",
        value: median
    });
});

app.get('/mode', async (req, res) => {
    //get the string of numbers entered
    const { nums } = req.query;
    console.log(nums);
    //separate the string by commas
    const stringNumbers = nums.split(",");
    console.log(stringNumbers);
    //create an empty array to hold each number
    const numbersArr = [];

    //fill the array and check all values are integers
    for (const stringNum of stringNumbers) {
        const number = parseInt(stringNum);
        if (isNaN(number)) {
            return res.json({
                message: `Error: ${stringNum} is not a valid integer`,
            });
        }
        numbersArr.push(number);
    }

    console.log(numbersArr);

    // Object to store the frequency of each element
    let mode = {};

    // Variable to store the frequency of the current mode
    let maxCount = 0;

    // Array to store the modes
    let modes = [];

    // Iterate through each element of the numbers array
    numbersArr.forEach(function (e) {
        if (mode[e] == null) {
            mode[e] = 1;
        } else {
            mode[e]++;
        }
        if (mode[e] > maxCount) {

            // Update the current mode and its frequency
            modes = [e];
            maxCount = mode[e];
        } else if (mode[e] === maxCount) {
            modes.push(e);
        }
    });
    return modes;

    console.log(modes);

    res.json({
        operation: "MODE",
        value: modes
    });
});

