#!/usr/bin/env node

// Require Node.js dependencies
const process = require("process");

// Require internal dependencies
const lstree = require("../index");
lstree()(process.cwd());
