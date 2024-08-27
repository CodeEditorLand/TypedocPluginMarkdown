# typedoc-hugo-theme

A [Hugo](https://gohugo.io/) compatible compatible [TypeDoc](https://github.com/TypeStrong/typedoc) theme.

[![npm](https://img.shields.io/npm/v/typedoc-hugo-theme.svg)](https://www.npmjs.com/package/typedoc-hugo-theme)
![CI](https://github.com/tgreyuk/typedoc-plugin-markdown/actions/workflows/ci.yml/badge.svg?branch=master)

## What Does It Do?

- Adds [Hugo Front Matter](https://gohugo.io/content-management/front-matter/) variables in YAML format to pages.
- Writes `_index.md` files to folders to enable [Branch Bundles](https://gohugo.io/content-management/page-bundles/#branch-bundles).

## 🚀 Installation

```shell
npm install typedoc typedoc-plugin-markdown typedoc-hugo-theme --save-dev
```

## 🛠️ Usage

```bash
$ npx typedoc --theme hugo [args]
```

## Options

Please refer to [typedoc-plugin-markdown](https://github.com/tgreyuk/typedoc-plugin-markdown/blob/master/packages/typedoc-plugin-markdown/README.md#options).


## Output

### Example page

```
---
title: "Class: SomeClass"
slug: "module.someclass"
linkTitle: "SomeClass"
---

+ page contents
```

### Example directory

```
classes
└─── _index.md
└─── ClassA.md
└─── ClassB.md
```

## License

[MIT](https://github.com/tgreyuk/typedoc-plugin-markdown/blob/master/packages/typedoc-hugo-theme/LICENSE)
