const fs = require("fs");

const express = require('express');

//express app setup
const app = express();

// register view engine
// app.set('view engine', 'ejs');
// not needed here

const PORT = 3000;

// math helpers //
const { calculateMean, calculateMedian, calculateMode, saveToFile } = require('./helpers');
const { parse } = require("path");

app.get('/all', async (req, res) => {
    //get the query
    const { nums } = req.query;

    //check if empty
    if (!nums) {
        return res.status(400).json({
            message: "Route GET /mean",
            operation: "mean",
            error: "Bad request, query param {nums} is required"
        });
    }
    // split the nums into an array
    const splitValues = nums.split(",");
    const numValues = [];

    //assume that we are getting correct input
    //Input will be validated, if NaN send 400
    for (const val of splitValues) {
        if (Number.isNaN(Number(val))) {
            return res.status(400).json({
                message: "Route GET /all",
                operation: "all",
                error: `Bad request, query param [${val}] is not a valid number`
            });
        }
        numValues.push(Number(val));
    }

    //calculate mean
    const mean = calculateMean(numValues);
    const median = calculateMedian(numValues);
    const mode = calculateMode(numValues);

    return res.status(200).json({
        message: "Route GET /all",
        operation: "all",
        mean,
        median,
        mode,

    });
});

//define our routes
app.get('/', (req, res) => {
    console.log('This is home')
    res.json({ message: "hello" });
});

// Create 3 operations: Mean, Median, Mode

//MEAN
app.get('/mean', async (req, res) => {
    //get the query
    const { nums, save } = req.query;

    //check if empty
    if (!nums) {
        return res.status(400).json({
            message: "Route GET /mean",
            operation: "mean",
            error: "Bad request, query param {nums} is required"
        });
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

    // check if we need to save
    if (save && save === "true") {
        saveToFile("mean", nums, MEAN);
    }

    return res.status(200).json({
        message: "Route GET /mean",
        operation: "MEAN",
        value: MEAN
    });
});

app.get("/median", async (req, res) => {
    //get the query
    const { nums, save } = req.query;

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

    if (save && save === "true") {
        const dataObj = { operation: "median", nums: nums, value: median };
        const JSONString = JSON.stringify(dataObj, null, 1);
        fs.writeFileSync("./results.json", JSONString);
    }

    // check if we need to save
    if (save && save === "true") {
        saveToFile("median", nums, median);
    }


    return res.status(200).json({
        message: "Route GET /median",
        operation: "median",
        value: median
    });
});


//mode route
app.get("/mode", async (req, res) => {
    //get the query
    const { nums, save } = req.query;

    //check if empty
    if (!nums) {
        return res.status(400).json({
            message: "Route GET /mean",
            operation: "mean",
            error: "Bad request, query param {nums} is required"
        })
    }

    //split the nums into an array
    const splitValues = nums.split(",");
    const numValues = [];

    // TODO: validate NaN
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

    //MODE OPERATIONS
    let highestOccurrence = 0;
    let numMap = {};

    for (const num of numValues) {
        if (numMap[num]) {
            numMap[num] += 1;
        } else {
            numMap[num] = 1;
        }

        if (numMap[num] > highestOccurrence) {
            highestOccurrence = numMap[num];
        }
    }

    //grab mode
    const mode = Object.keys(numMap).filter((key) => {
        return numMap[key] === highestOccurrence;
    })


    console.log(numMap, highestOccurrence);

    if (save && save === "true") {
        const dataObj = { operation: "mode", nums: nums, value: mode };
        const JSONString = JSON.stringify(dataObj, null, 1);
        fs.writeFileSync("./results.json", JSONString);
    }

    // check if we need to save
    if (save && save === "true") {
        saveToFile("mode", nums, mode);
    }

    return res.status(200).json({
        message: "Route GET /mode",
        operation: "mode",
        value: mode
    });
});

//find the square root of a number
app.get('/squareRoot', async (req, res) => {
    //get the query
    const num = parseFloat(req.query.num);
    console.log(num);

    //check if empty
    if (!num) {
        return res.status(400).json({
            message: "Route GET /squareRoot",
            operation: "squareRoot",
            error: "Bad request, query param {num} is required"
        });
    }

    const squareRoot = Math.sqrt(num);

    res.json({
        message: "Route GET /squareRoot",
        operation: "squareRoot",
        value: squareRoot
    });
});

//listen for requests
app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});