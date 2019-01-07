/**
 * @namespace lstree
 */
// Require Node.js Dependencies
const { readdir, stat } = require("fs").promises;
const { join } = require("path");

// Require Third-party Dependencies
const { yellow, gray, green, cyan } = require("kleur");
const is = require("@slimio/is");
const { parseArg, argDefinition } = require("@slimio/arg-parser");

/**
 * @version 0.1.0
 * @method tree
 * @desc desc clojure
 * @memberof lstree
 * @param {Object=} options object representing the options for customizing the tree view.
 * @param {String[]=} options.ignore allows you to exclude files or folders from the tree.
 * @param {Map=} options.description allows you to add a description for files to their right.
 * The key is the name of file, value is the description of the file.
 * @return {Promise}
 *
 * @example
 * const options = {
 *      ignore: ["folderName", "fileName.ext", "fuu", "text.txt"],
 *      description: new Map([["suprise.txt", "Descritpion of surprise file"]])
 * }
 * tree(options)(process.cwd());
 * // OR
 * const closure = tree(options);
 * options("C:/path/to/your/directory");
 */
function tree(options = {}) {
    const IGNNORE_FILE = new Set(["node_module", "coverage", "docs", ".nyc_output", ".git"]);
    const DESC_FILE = new Map([
        [".eslintrc", "ESLint configuration"],
        [".editorconfig", "Configuration for the code editor"],
        [".gitignore", "Files to ignore on GIT"],
        [".npmignore", "Files to ignore when publishing the NPM package"],
        [".npmrc", "Local configuration of NPM"],
        ["LICENCE", "Legal license of the project"],
        ["CONTRIBUTING.md", "Code of Conduct & Contribution Rules for the SlimIO Project"],
        ["commitlint.config.json", "Configuration of the convention to respect for GIT commits"],
        ["jsdoc.json", "Configuration to generate the JSDoc with the command npm run doc"],
        ["package.json", "Manifest of the project"],
        ["README.md", "Documentation of the projet (start, use...)"]
    ]);

    if (!is.nullOrUndefined(options.ignore)) {
        for (const optIgnore of options.ignore) {
            IGNNORE_FILE.add(optIgnore);
        }
    }

    if (is.map(options.description)) {
        for (const [key, val] of options.description) {
            if (!DESC_FILE.has(key)) {
                DESC_FILE.set(key, val);
            }
        }
    }
    else {
        throw new Error("options.descrition parameter must be a map");
    }

    const argParsed = parseArg([
        argDefinition("-d --depth [number=0]", "Limit the tree depth display. root is equal to 0"),
        argDefinition("-v --view", "Display files description to their right")
    ]);

    /**
     * @version 0.1.0
     * @method lsTree
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
    return async function lstree(dir, pRootPath = null) {
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
        // number of folder into a specific directory
        let nbFolder = 0;

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
                nbFolder++;
                // Only for the first folder, beggin with ┌ insted of ├
                const strDir = depth === 0 && nbFolder === 1 ?
                    yellow(`┌─📁 ${elems[i]}`) :
                    yellow(`├─📁 ${elems[i]}`);
                console.log(`${strAddDepth}${(strDir)}`);

                if (argParsed.has("depth") && argParsed.get("depth") <= depth) {
                    continue;
                }
                await lstree(join(dir, elems[i]), rootPath);
            }
            else {
                files.push(elems[i]);
            }
        }

        const last = files.length - 1;
        // Print all files after folders
        for (const [ind, val] of files.entries()) {
            if (argParsed.get("view") && DESC_FILE.has(val)) {
                // ajouter la desc a la droite
                const desc = DESC_FILE.get(val);
                console.log(yellow(`${strAddDepth}${ind === last ? "└" : "├"} ${gray(`${val}`)} ${cyan(`(${desc})`)}`));
            }
            else {
                console.log(yellow(`${strAddDepth}${ind === last ? "└" : "├"} ${gray(`${val}`)}`));
            }
        }
    };
}

module.exports = tree;
