# lstree
![version](https://img.shields.io/badge/dynamic/json.svg?style=for-the-badge&url=https://raw.githubusercontent.com/TopCli/lstree/master/package.json&query=$.version&label=Version)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg?style=for-the-badge)](https://github.com/TopCli/lstree/commit-activity)
[![mit](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://github.com/TopCli/lstree/blob/master/LICENSE)
[![OpenSSF
Scorecard](https://api.securityscorecards.dev/projects/github.com/TopCli/lstree/badge?style=for-the-badge)](https://api.securityscorecards.dev/projects/github.com/TopCli/tlstree)
![build](https://img.shields.io/github/actions/workflow/status/TopCli/lstree/node.js.yml?style=for-the-badge)


System Tree Printer as CLI (with a Node.js API). Stdout to the terminal the current working dir tree.

<p align="center">
    <img src="https://i.imgur.com/0lA271j.png">
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
interface LStreeOptions {
  ignore?: string[];
  description?: Map<string, string>;
  depth?: number;
  showFilesDescriptor?: boolean;
  showTitle?: boolean;
  title?: string;
  margin?: {
    top?: number;
    left?: number;
    bottom?: number;
  };
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
[![All Contributors](https://img.shields.io/badge/all_contributors-5-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://www.linkedin.com/in/thomas-gentilhomme/"><img src="https://avatars.githubusercontent.com/u/4438263?v=4?s=100" width="100px;" alt="Gentilhomme"/><br /><sub><b>Gentilhomme</b></sub></a><br /><a href="https://github.com/TopCli/lstree/commits?author=fraxken" title="Code">💻</a> <a href="https://github.com/TopCli/lstree/commits?author=fraxken" title="Documentation">📖</a> <a href="https://github.com/TopCli/lstree/pulls?q=is%3Apr+reviewed-by%3Afraxken" title="Reviewed Pull Requests">👀</a> <a href="#security-fraxken" title="Security">🛡️</a> <a href="https://github.com/TopCli/lstree/issues?q=author%3Afraxken" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.linkedin.com/in/mark-malaj-99b1b8b7/"><img src="https://avatars.githubusercontent.com/u/15210179?v=4?s=100" width="100px;" alt="Mark MALAJ"/><br /><sub><b>Mark MALAJ</b></sub></a><br /><a href="https://github.com/TopCli/lstree/commits?author=Markobobby" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/AlexandreMalaj"><img src="https://avatars.githubusercontent.com/u/32218832?v=4?s=100" width="100px;" alt="Alexandre Malaj"/><br /><sub><b>Alexandre Malaj</b></sub></a><br /><a href="https://github.com/TopCli/lstree/commits?author=AlexandreMalaj" title="Documentation">📖</a> <a href="https://github.com/TopCli/lstree/pulls?q=is%3Apr+reviewed-by%3AAlexandreMalaj" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Captainfive"><img src="https://avatars.githubusercontent.com/u/38983657?v=4?s=100" width="100px;" alt="MONTES Irvin"/><br /><sub><b>MONTES Irvin</b></sub></a><br /><a href="https://github.com/TopCli/lstree/commits?author=Captainfive" title="Documentation">📖</a> <a href="https://github.com/TopCli/lstree/pulls?q=is%3Apr+reviewed-by%3ACaptainfive" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/PierreDemailly"><img src="https://avatars.githubusercontent.com/u/39910767?v=4?s=100" width="100px;" alt="PierreDemailly"/><br /><sub><b>PierreDemailly</b></sub></a><br /><a href="https://github.com/TopCli/lstree/commits?author=PierreDemailly" title="Code">💻</a> <a href="https://github.com/TopCli/lstree/commits?author=PierreDemailly" title="Tests">⚠️</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## License
MIT
