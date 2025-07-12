const express = require('express');

//express app setup
const app = express();

const PORT = 4000;

//listen for requests
app.listen(PORT, () => {
    console.log('Server running on PORT: ${PORT}');
});

const { application } = require("express");

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