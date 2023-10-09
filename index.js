// Import Node.js Dependencies
import fs from "fs/promises";
import path from "path";
import os from "node:os";

// Import Third-party Dependencies
import kleur from "kleur";
import is from "@slimio/is";

const { yellow, white, cyan, gray } = kleur;

/**
 * @param {object} [options] object representing the options for customizing the tree view.
 * @param {string[]} [options.ignore] allows you to exclude files or folders from the tree.
 * @param {Map} [options.description] allows you to add a description for files to their right.
 * The key is the name of file, value is the description of the file.
 * @param {number} [options.depth=1] Wanted depth
 * @param {boolean} [options.showFilesDescriptor=false] view file description
 * @param {boolean} [options.showTitle=true] view lstree title
 * @param {string} [options.title="project tree"] allow to add a custom title, default "project tree"
 * @param {number} [options.margin.top] allow to add a margin top (one new line per number)
 * @param {number} [options.margin.left] allow to add a margin left (two spaces per number)
 * @param {number} [options.margin.bottom] allow to add a margin bottom (one new line per number)
 * @returns {(path: string) => Promise<void>}
 *
 * @example
 * const options = {
 *     ignore: ["folderName", "docFolder", "file.txt", "file.js"],
 *     description: new Map([["nameFile.txt", "File description"], ["newfile.h", "File description"]])
 * };
 * tree(options)(process.cwd());
 * // OR
 * const lstree = tree(options);
 * lstree("C:/path/to/your/directory");
 */
export default function tree(options = Object.create(null)) {
  const IGNORE_FILE = new Set(["node_modules", "coverage", "docs", ".nyc_output", ".git"]);
  const DESC_FILE = new Map([
  // Configuration files
    [".babelrc", "Babel configuration for JavaScript transpilation"],
    ["tsconfig.json", "TypeScript configuration for TypeScript projects"],
    ["jest.config.js", "Jest configuration for testing"],
    ["webpack.config.js", "Webpack configuration for bundling assets"],
    [".all-contributorsrc", "All Contributors configuration for managing project contributors"],
    [".editorconfig", "EditorConfig configuration for maintaining consistent coding styles between different editors and IDEs"],
    [".gitignore", " Specifies files and directories to be ignored by Git"],
    [".npmrc", "Configuration file for npm"],

    // Dependency management
    ["package-lock.json", "npm package lock file for managing package dependencies with npm"],
    ["yarn.lock", "Yarn lock file for managing package dependencies with Yarn"],
    ["pnpm-lock.yaml", "pnpm lock file for managing package dependencies with pnpm"],

    // Scripts and automation
    ["prettier.config.js", "Prettier configuration for code formatting"],
    ["husky.config.js", "Husky configuration for Git hooks"],
    ["lint-staged.config.js", "Lint-staged configuration for running linters on staged files"],

    // Documentation
    ["CHANGELOG.md", "Changelog to document project changes and version history"],
    ["CODE_OF_CONDUCT.md", "Code of Conduct for the project contributors"],
    ["CONTRIBUTING.md", "Guidelines for contributing to the project"],

    // Testing
    [".env.example", "Example environment variables file for local development"],

    // Continuous Integration
    [".github", "GitHub Actions configuration for automating workflows"],
    ["dependabot.yml", "Dependabot configuration for automating dependency updates"],
    ["scorecard.yml", "OSSF Scorecard analysis configuration for evaluating open source projects"],
    ["codeql.yml", "CodeQL configuration for analyzing code quality"],
    ["node.js.yml", "Node.js pipeline configuration for running tests, linting..."],

    // Docker
    ["Dockerfile", "Docker configuration for containerizing the application"],
    ["docker-compose.yml", "Docker Compose configuration for managing containers"],

    // Environment Variables
    [".env", "Environment variables file for local development (contains sensitive data, not committed to VCS)"],

    // Node.js runtime
    ["index.js", "Main application file"],

    // Other project-related files
    ["LICENSE", "Legal license of the project"],
    ["jsdoc.json", "Configuration to generate JSDoc with the command npm run doc"],
    ["package.json", "Manifest of the project"],
    ["README.md", "Documentation of the project (start, use...)"]
  ]);

  // Retrieve and apply arguments
  if (is.array(options.ignore)) {
    for (const optIgnore of options.ignore) {
      IGNORE_FILE.add(optIgnore);
    }
  }

  if (is.map(options.description)) {
    for (const [key, val] of options.description) {
      DESC_FILE.set(key, val);
    }
  }

  const wantedDepth = is.number(options.depth) ? options.depth : 0;
  const viewFileDescription = is.bool(options.showFilesDescriptor) ? options.showFilesDescriptor : false;

  /**
   * @version 0.1.0
   * @function lsTree
   * @description Print the list of the entire folder and file in the directory.
   *  Does not take into account the skipped folders or file contained in the Set named "IGNORE_FILE"
   * @memberof lstree
   * @param {!string} dir directory path. Path can handle "/" and "\" separator and not end with a separator
   * @param {number} [pRootPath] path of the root folder if there is recursivity
   * @returns {Promise<void>}
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

    let marginTop = options.margin?.top;
    if (pRootPath === null && marginTop) {
      while (marginTop-- > 0) {
        console.log("");
      }
    }

    const rootPath = pRootPath === null ? dir : pRootPath;
    // Calculate Depth with root folder and number of separators "\"
    const depth = dir.replace(rootPath, "").match(/[/\\]/g, "")?.length ?? 0;

    let strAddDepth = "".padStart(2 * options.margin?.left ?? 0, " ");
    if (depth > 0) {
      for (let index = 0; index < depth; index++) {
        strAddDepth += yellow("│ ");
      }
    }

    const elems = await fs.readdir(dir);
    const statFiles = await Promise.all(elems.map(
      (file) => fs.stat(path.join(dir, file))
    ));
    const files = [];
    // number of folder into a specific directory
    let nbFolder = 0;

    // Print only one time at the begginning
    if (depth === 0 && (is.bool(options.showTitle) ? options.showTitle : true)) {
      const title = options.title ?? "project tree";
      console.log(gray(`${os.EOL} > ${title}${os.EOL}`));
    }

    // eslint-disable-next-line
    for (let i = 0; i < statFiles.length; i++) {
      if (IGNORE_FILE.has(elems[i])) {
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
        console.log(`${strAddDepth}${strDir}`);

        if (wantedDepth <= depth) {
          continue;
        }
        await lstree(path.join(dir, elems[i]), rootPath);
      }
      else {
        files.push(elems[i]);
      }
    }

    function getPrefix(index) {
      if (nbFolder === 0 && depth === 0 && files.length === 1) {
        return "──";
      }

      if (index === files.length - 1) {
        return "└─";
      }

      return nbFolder === 0 && depth === 0 && index === 0 ? "┌─" : "├─";
    }

    // Print all files after folders
    for (const [index, fileName] of files.entries()) {
      const prefix = getPrefix(index);
      if (viewFileDescription && DESC_FILE.has(fileName)) {
        // ajouter la desc a la droite
        const desc = DESC_FILE.get(fileName);
        console.log(yellow(`${strAddDepth}${prefix} ${white(`${fileName}`)} ${cyan(`(${desc})`)}`));
      }
      else {
        console.log(yellow(`${strAddDepth}${prefix} ${white(`${fileName}`)}`));
      }
    }

    let marginBottom = options.margin?.bottom;
    if (depth === 0 && options.margin?.bottom) {
      while (marginBottom-- > 0) {
        console.log("");
      }
    }
  };
}
