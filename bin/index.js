#!/usr/bin/env node

// Require Third-party Dependencies
const { parseArg, argDefinition } = require("@slimio/arg-parser");

// Require internal dependencies
const lstree = require("../index");

const argParsed = parseArg([
    argDefinition("-d --depth [number=2]", "Limit the tree depth display. root is equal to 0"),
    argDefinition("-s --showfd", "Display files description to their right")
]);

lstree({
    depth: argParsed.get("depth"),
    showFilesDescriptor: argParsed.get("showfd")
})(process.cwd());
