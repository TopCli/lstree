#!/usr/bin/env node

// Require Node.js dependencies
const process = require("process");

// Require internal dependencies
const tree = require("../index");

const options = {
    ignore: ["ZZZZ", "docs", "test.doc", "fuu", "bar"],
    viewDescription: false,
    description: new Map([["suprise.txt", "Fichiers surprise"]])
};

tree(options)(process.cwd());
