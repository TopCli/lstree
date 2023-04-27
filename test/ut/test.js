// Import Node.js Dependencies
import { test } from "node:test";
import assert from "node:assert";
import { EOL } from "node:os";

// Import Internal Dependencies
import tree from "../../index.js";
import { join } from "node:path";

test("it should throw an error when directory path is missing", async() => {
  try {
    await tree()();
  }
  catch (error) {
    assert.equal(error.message, "Current working directory path is missing");
  }
});

// TODO: package is completely broken
// test("it should print the list of the entire folder and file in the directory", async() => {
//   const logs = [];
//   console.log = (data) => logs.push(data);

//   await tree({ depth: 3 })(join(process.cwd(), "/test/fixtures"));
//   assert.equal(logs.shift(), "┌─📁 folderA");
//   assert.equal(logs.shift(), "│ ├─📁 folderB");
//   assert.equal(logs.shift(), "│ │ └─📄 fileB.js");
//   assert.equal(logs.shift(), "│ └─📄 fileA.txt");
//   assert.equal(logs.shift(), "└─📄 index.js");
// });
