#!/usr/bin/env node

"use strict";

// Require Third-party Dependencies
const { parseArg, argDefinition } = require("@slimio/arg-parser");

// Require internal dependencies
const lstree = require("../index");

const argParsed = parseArg([
    argDefinition("-d --depth [number=0]", "Limit the tree depth display. root is equal to 0"),
    argDefinition("-s --showfd", "Display files description to their right"),
    argDefinition("-i --ignore [array]", "List of files to ignore")
]);

lstree({
    depth: argParsed.get("depth"),
    showFilesDescriptor: argParsed.get("showfd"),
    ignore: argParsed.get("ignore")
})(process.cwd());
