# lstree
![version](https://img.shields.io/badge/dynamic/json.svg?url=https://raw.githubusercontent.com/SlimIO/lstree/master/package.json&query=$.version&label=Version)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/SlimIO/lstree/commit-activity)
![MIT](https://img.shields.io/github/license/mashape/apistatus.svg)
![dep](https://img.shields.io/david/SlimIO/lstree.svg)
![size](https://img.shields.io/bundlephobia/min/@slimio/lstree.svg)
[![Known Vulnerabilities](https://snyk.io//test/github/SlimIO/lstree/badge.svg?targetFile=package.json)](https://snyk.io//test/github/SlimIO/lstree?targetFile=package.json)
[![Build Status](https://travis-ci.com/SlimIO/lstree.svg?branch=master)](https://travis-ci.com/SlimIO/lstree)

System Tree Printer as CLI (with a Node.js API). Stdout to the terminal the current working dir tree.

<p align="center">
    <img src="https://i.imgur.com/PTo2okT.png">
</p>

## Requirements
- [Node.js](https://nodejs.org/en/) v12 or higher.

## Getting Started
This package is available in the Node Package Repository and can be easily installed with [npm](https://docs.npmjs.com/getting-started/what-is-npm) or [yarn](https://yarnpkg.com).

```bash
$ npm install @slimio/lstree -g
# or
$ npx @slimio/lstree
```

## Usage example
The package can be used as a binary command or as an API.

```js
const tree = require("@slimio/lstree");
const lstree = tree({ depth: 2, ignore: ["test"] });

lstree(process.cwd()).catch(console.error);
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

### three(options?: lstree.options): lstree
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

## Dependencies

|Name|Refactoring|Security Risk|Usage|
|---|---|---|---|
|[@slimio/arg-parser](https://github.com/SlimIO/ArgParser#readme)|Minor|Low|CLI argument parser|
|[@slimio/is](https://github.com/SlimIO/is#readme)|Minor|Low|Type checker|
|[kleur](https://github.com/lukeed/kleur#readme)|Minor|Low|CLI color|

## License
MIT
