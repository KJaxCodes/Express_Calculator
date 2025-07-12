const express = require('express');

//express app setup
const app = express();

const PORT = 4000;

//listen for requests
app.listen(PORT, () => {
    console.log('Server running on PORT: ${PORT}');
});

const { application } = require("express");

