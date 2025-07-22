const fs = require("fs");

/**
 * Calculates the mean
 * @param {Array} dataArr - Array of numbers
 * @returns number representing mean
 */
const calculateMean = (dataArr) => {
    //compute the sum
    const sum = dataArr.reduce((accumulator, currentValue) => {
        return accumulator += currentValue;
    }, 0);

    //get mean
    const inputLength = dataArr.length;
    const mean = sum / inputLength;

    return mean;
};

/**
 * Calculates the median
 * @param {Array} dataArr - Array of numbers
 * @returns number representing mean
 */
const calculateMedian = (dataArr) => {

    //sort and calculate the median
    dataArr.sort((a, b) => a - b);
    //get the middle of the array
    const middle = Math.floor(dataArr.length / 2) //7 -> 3.5 -> 3
    let median = 0;

    if (dataArr.length % 2 === 0) {
        median = (dataArr[middle] + dataArr[middle - 1] / 2)
    } else {
        median = dataArr[middle];
    }
    return median;

};

/**
 * Calculates the mode
 * @param {Array} dataArr - Array of numbers
 * @returns Array of numbers representing mode
 */
const calculateMode = (dataArr) => {
    // MODE OPERATIONS
    // numMap = { "1": 1, "2": 1, "3": 3, "4": 3, "5":1}
    let highestOccurrence = 0; //3
    let numMap = {};

    for (const num of dataArr) {
        if (numMap[num]) {
            numMap[num] += 1;
        } else {
            numMap[num] = 1;
        }

        if (numMap[num] > highestOccurrence) {
            highestOccurrence = numMap[num];
        }
    }
    // grab mode
    const mode = Object.keys(numMap)
        .filter((key) => {
            return numMap[key] === highestOccurrence;
        })
        .map((val) => {
            return Number(val);
        })

    return mode;

};

/**
 * will write to file if save === "true"
 * @param {string} save 
 * @param {string} operation 
 * @param {number} value 
 * @param {array} nums
 */
const saveToFile = (operation, nums, value) => {
    //first read and check if file exists
    try {
        const results = fs.readFileSync("./results.json", { encoding: "utf-8" });
        const parsedResults = JSON.parse(results); //parse into a JS object

        const dataObj = { operation: operation, nums: nums, value: value }; // new data object, incoming
        parsedResults.savedOperations.push(dataObj); // push in the new data object

        const JSONString = JSON.stringify(parsedResults, null, 1); //stringify the update

        fs.writeFileSync("./results.json", JSONString); //write to the file

    } catch (error) {
        console.log("No results.json yet, creating")
        const dataObj = { operation: operation, nums: nums, value: value }; // object
        // const JSONString = JSON.stringify(dataObj, null, 1); // "{'operation': 'mean', 'value': '4.5', 'nums': '3,4,5,6,7' }"


        const results = {
            savedOperations: [dataObj]
        };
        const JSONString = JSON.stringify(results, null, 1);
        fs.writeFileSync("./results.json", JSONString);
    }
}


module.exports = {
    calculateMean,
    calculateMedian,
    calculateMode,
    saveToFile
};