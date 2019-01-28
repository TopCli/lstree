# lstree
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/SlimIO/lstree/commit-activity)
![MIT](https://img.shields.io/github/license/mashape/apistatus.svg)
![V0.1.0](https://img.shields.io/badge/version-0.1.0-blue.svg)

Stdout to terminal the current working dir tree. Can work as CLI or API.

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

### lstree(dir: string, depth?: number): Promise<void>
Call lstree at the wanted location. lstree is an Asynchronous function.

```js
lstree(__dirname).catch(console.error);
```

## Licence
MIT
