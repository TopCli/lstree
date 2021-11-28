# lstree
![version](https://img.shields.io/badge/dynamic/json.svg?url=https://raw.githubusercontent.com/TopCli/lstree/master/package.json&query=$.version&label=Version)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/TopCli/lstree/commit-activity)
[![Security Responsible Disclosure](https://img.shields.io/badge/Security-Responsible%20Disclosure-yellow.svg)](https://github.com/nodejs/security-wg/blob/master/processes/responsible_disclosure_template.md
)
[![mit](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/TopCli/lstree/blob/master/LICENSE)
![build](https://img.shields.io/github/workflow/status/TopCli/lstree/Node.js%20CI)

System Tree Printer as CLI (with a Node.js API). Stdout to the terminal the current working dir tree.

<p align="center">
    <img src="https://i.imgur.com/PTo2okT.png">
</p>

## Requirements
- [Node.js](https://nodejs.org/en/) v14 or higher.

## Getting Started
This package is available in the Node Package Repository and can be easily installed with [npm](https://docs.npmjs.com/getting-started/what-is-npm) or [yarn](https://yarnpkg.com).

```bash
$ npm install @topcli/lstree -g
# or
$ npx @topcli/lstree
```

## Usage example
The package can be used as a binary command or as an API.

```js
import tree from "@topcli/lstree";

const lstree = tree({ depth: 2, ignore: ["test"] });

await lstree(process.cwd());
```

To use it as a cmd:
```bash
$ lstree -d 2
```

Available script arguments are:

| name | type | defaultValue |
| --- | --- | --- |
| -d --depth | number | **0** |
| -s --showfd | boolean | **false** |
| -i --ignore | array | **[]** |


## API

### tree(options?: lstree.options): lstree
Create a new lstree clojure function. Available options are:
```ts
interface options {
  ignore?: string[];
  description?: Map<string, string>;
  depth?: number;
  showFilesDescriptor?: boolean;
}
```

Default ignored files and directories are: `node_modules`, `coverage`, `docs`, `.nyc_output`, `.git`.

### lstree(dir: string, depth?: number): Promise< void >
Call lstree at the wanted location. lstree is an Asynchronous function.

```js
lstree(__dirname).catch(console.error);
```

## Contributors ✨

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## License
MIT
