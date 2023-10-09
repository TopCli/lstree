// Import Node.js Dependencies
import assert from "node:assert";
import { test } from "node:test";
import { join } from "node:path";

// Import Third-party Dependencies
import stripAnsi from "strip-ansi";

// Import Internal Dependencies
import tree from "../../index.js";

test("it should throw an error when directory path is missing", async() => {
  try {
    await tree()();
  }
  catch (error) {
    assert.equal(error.message, "Current working directory path is missing");
  }
});

test("it should print the list of the entire folder and file in the directory", async() => {
  const logs = [];
  console.log = (data) => logs.push(stripAnsi(data).trim());

  await tree({ depth: 3 })(join(process.cwd(), "/test/fixtures"));
  assert.equal(logs.shift(), "> project tree");
  assert.equal(logs.shift(), "┌─📁 folderA");
  assert.equal(logs.shift(), "│ ├─📁 folderB");
  assert.equal(logs.shift(), "│ │ └─ b.js");
  assert.equal(logs.shift(), "│ └─ fileA.txt");
  assert.equal(logs.shift(), "└─ index.js");
});

test("it should add and show custom description", async() => {
  const logs = [];
  console.log = (data) => logs.push(stripAnsi(data).trim());

  await tree({
    depth: 3,
    description: new Map([["fileA.txt", "foo"]]),
    showFilesDescriptor: true
  })(join(process.cwd(), "/test/fixtures"));

  assert.equal(logs.shift(), "> project tree");
  assert.equal(logs.shift(), "┌─📁 folderA");
  assert.equal(logs.shift(), "│ ├─📁 folderB");
  assert.equal(logs.shift(), "│ │ └─ b.js");
  assert.equal(logs.shift(), "│ └─ fileA.txt (foo)");
  assert.equal(logs.shift(), "└─ index.js (Main application file)");
});

test("it should ignore folder", async() => {
  const logs = [];
  console.log = (data) => logs.push(stripAnsi(data).trim());

  await tree({ depth: 3, ignore: ["folderA"] })(join(process.cwd(), "/test/fixtures"));
  assert.equal(logs.shift(), "> project tree");
  assert.equal(logs.shift(), "── index.js");
});

test("it show custom title", async() => {
  const logs = [];
  console.log = (data) => logs.push(stripAnsi(data).trim());

  await tree({ depth: 3, ignore: ["folderA"], title: "foo" })(join(process.cwd(), "/test/fixtures"));
  assert.equal(logs.shift(), "> foo");
  assert.equal(logs.shift(), "── index.js");
});

