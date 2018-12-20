/**
 * @namespace lstree
 */
// Require Node.js Dependencies
const { readdir, stat } = require("fs").promises;
const { join } = require("path");

// Require Third-party Dependencies
const { yellow, gray, green } = require("kleur");
const is = require("@slimio/is");

const IGNNORE_FILE = new Set(["node_module", "coverage", "docs", ".nyc_output", ".git"]);

/**
 * @version 0.1.0
 * @method printTree
 * @desc Print the list of the entire folder and file in the directory.
 *  Does not take into account the skipped folders or file contained in the Set named "IGNORE_FILE"
 * @memberof lstree
 * @param {!string} dir directory path. Path can handle "/" and "\" separator and not end with a separator
 * @param {number=} pRootPath path of the root folder if there is recursivity
 * @returns {void}
 * @example
 * tree("C:/path/to/your/directory/newProject");
 * output expected :
 * ┌─📁bin
 * │ └ index1.js
 * ├─📁test
 * │ └ test.js
 * ├ .editorconfig
 * ├ .eslintrc
 * ├ .gitignore
 * ├ .npmignore
 * ├ .npmrc
 * ├ commitlint.config.js
 * ├ CONTRIBUTING.md
 * ├ index.js
 * ├ jsdoc.json
 * ├ LICENSE
 * ├ package.json
 * └ README.md
 */
async function lstree(dir, pRootPath = null) {
    if (is.nullOrUndefined(dir)) {
        throw new Error("Current working directory path is missing");
    }
    if (dir.match(/\//gi)) {
        // eslint-disable-next-line
        dir = dir.replace(/\//gi, "\\");
    }
    if (dir.match(/\\$/gi)) {
        // eslint-disable-next-line
        dir = dir.replace(/\\$/gi, "");
    }

    const rootPath = pRootPath === null ? dir : pRootPath;
    // Calculate Depth with root folder and number of separators "\"
    const depth = is.nullOrUndefined(dir.replace(rootPath, "").match(/\\\w+/g)) ?
        0 : dir.replace(rootPath, "").match(/\\\w+/g).length;

    let strAddDepth = "";
    if (depth > 0) {
        for (let index = 0; index < depth; index++) {
            strAddDepth += yellow("│ ");
        }
    }

    const elems = await readdir(dir);
    const statFiles = await Promise.all(elems.map(
        (file) => stat(join(dir, file))
    ));
    const files = [];
    let count = 0;

    // Print only one time at the begginning
    if (depth === 0) {
        console.log(green("project tree :"));
    }

    // eslint-disable-next-line
    for (let i = 0; i < statFiles.length; i++) {
        if (IGNNORE_FILE.has(elems[i])) {
            continue;
        }

        const statFile = statFiles[i];
        if (statFile.isDirectory()) {
            // Print folders befor files
            // Only for the first folder, beggin with ┌ insted of ├
            const strDir = depth === 0 && count === 0 ?
                yellow(`┌─📁 ${elems[i]}`) :
                yellow(`├─📁 ${elems[i]}`);
            console.log(`${strAddDepth}${(strDir)}`);

            await lstree(join(dir, elems[i]), rootPath);
            count++;
        }
        else {
            files.push(elems[i]);
        }
    }
    const last = files.length - 1;
    // Print all files after folders
    for (const [ind, val] of files.entries()) {
        console.log(yellow(`${strAddDepth}${ind === last ? "└" : "├"} ${gray(`${val}`)}`));
    }
}

module.exports = lstree;
