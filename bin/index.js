#!/usr/bin/env node

// Require Node.js dependencies
const process = require("process");

// Require internal dependencies
const lstree = require("../index");

// Add options
const options = {
    ignore: [],
    description: new Map()
};

lstree(options)(process.cwd());
