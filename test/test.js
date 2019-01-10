// Require Third-party Dependencies
const avaTest = require("ava");
const execa = require("execa");

// Require Internal Dependencies
const tree = require("..");

avaTest("Echo", async(assert) => {
    execa("ECHO TEST");
    assert.pass();
});

avaTest("tree: basic function", async(assert) => {
    const options = {
        ignore: ["folder", "file.js"],
        description: new Map([["file.js", "file descr"]])
    };
    await tree(options)("D:/test");
    assert.pass();
});

avaTest("tree: should throw 'options.descrition parameter must be a map'", (assert) => { 
    const options = {
        description: { "file.js": "file descr" }
    };
    assert.throws(() => {
        tree()("D:\\test");
    }, { instanceOf: Error, message: "options.descrition parameter must be a map" });
});

// avaTest("tree: should throw 'Current working directory path is missing'", (assert) => {
//     const options = {
//         ignore: [],
//         description: new Map([["file.js", "file descr"]])
//     };
//     assert.throwsAsync(async() => {
//         const lstree = tree(options);
//         await lstree();
//     }, { instanceOf: Error, message: "Current working directory path is missing" });
// });
