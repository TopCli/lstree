#!/usr/bin/env node

// Import Third-party Dependencies
import sade from "sade";

// Import internal dependencies
import lstree from "../index.js";

const prog = sade("", true)
  .option("-d --depth [number=0]", "Limit the tree depth display. root is equal to 0", 0)
  .option("-s --showfd", "Display files description to their right", false)
  .option("-i --ignore [array]", "List of files to ignore", [])
  .action((opts) => {
    const ignore = typeof opts.ignore === "string" ? opts.ignore.split(",") : [];
    const depth = typeof opts.depth === "boolean" ? 0 : Number(opts.depth);

    lstree({
      depth: Number.isNaN(depth) ? 0 : depth,
      showFilesDescriptor: Boolean(opts.showfd),
      ignore
    })(process.cwd());
  });

prog.parse(process.argv);
