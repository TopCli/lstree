#!/usr/bin/env node

// Import Node.js Dependencies
import { parseArgs } from "node:util";

// Import Internal Dependencies
import lstree from "../index.js";

const { values } = parseArgs({
  options: {
    depth: {
      type: "string",
      short: "d",
      default: "0"
    },
    showfd: {
      type: "boolean",
      short: "s",
      default: false
    },
    ignore: {
      type: "string",
      short: "i",
      default: ""
    },
    help: {
      type: "boolean",
      short: "h",
      default: false
    }
  },
  strict: true,
  allowPositionals: false
});

if (values.help) {
  console.log(`
lstree - System Tree Printer

Usage:
  lstree [options]

Options:
  -d, --depth <number>    Limit the tree depth display. Root is equal to 0 (default: 0)
  -s, --showfd            Display files description to their right (default: false)
  -i, --ignore <list>     Comma-separated list of files/folders to ignore
  -h, --help              Display this help message

Examples:
  lstree
  lstree --depth 2
  lstree -d 2 -s
  lstree --ignore node_modules,dist
`);
  process.exit(0);
}

const ignore = values.ignore ? values.ignore.split(",") : [];
const depth = Number(values.depth);

lstree({
  depth: Number.isNaN(depth) ? 0 : depth,
  showFilesDescriptor: values.showfd,
  ignore
})(process.cwd());
