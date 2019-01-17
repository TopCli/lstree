#!/usr/bin/env node

// Require internal dependencies
const tree = require("../index");

const options = {
    ignore: ["ZZZZ", "docs", "test.doc", "fuu", "bar"],
    description: new Map([["suprise.txt", "Fichiers surprise"], ["newTxt.txt", "DESCRIPTION"]])
};

tree(options)(process.cwd());
