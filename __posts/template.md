---
slug: 'template'
title: Blog Template
image: /pic2.jpg
description: Coding is such a blissful activity.
date: '2022-10-10'
featured: 1
category: Next.js
---

Some introductory text.

# Look at all these headers!

## h2

### h3

#### h4

##### h5

###### h6

## Bulleted List

Changes are automatically rendered as you type.

- Wow! Look at all these bullets
- Renders actual, "native" React DOM elements
- Allows you to escape or skip HTML (try toggling the checkboxes above)
- If you escape or skip the HTML, no `dangerouslySetInnerHTML` is used! Yay!

## BlockQuote

> This blockquote will change based on the HTML settings above.

The paragraph renderer automatically adds a margin below each paragraph, but you can add newlines with `&nbsp; ` (two spaces after the `;`) as needed.

## How about some code?

```js
var React = require('react')
var Markdown = require('react-markdown')

React.render(
  <Markdown source="# Your markdown here" />,
  document.getElementById('content')
)
```

Pretty neat, eh?

## Tables

|  Feature  | Support |
| :-------: | ------- |
|  tables   | ✔       |
| alignment | ✔       |
|   wewt    | ✔       |

## More info?

Read usage information and more on [GitHub](https://github.com/remarkjs/react-markdown)
