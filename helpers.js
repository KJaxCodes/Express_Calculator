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

module.exports = {
    calculateMean,
    calculateMedian,
    calculateMode
};