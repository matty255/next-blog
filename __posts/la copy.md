---
slug: la copy
title: 이미지를 적용하는 방법 이미지를 적용하는 방법이미지를 적용하는 방법이미지를 적용하는 방법
image: /pic1.webp
description: next.js에서 이미지를 적용하는 방법을 설명하는 글. 텍스트가 길어져도 잘리지 않게. 텍스트가 길어져도 잘리지 않게 텍스트가 길어져도 잘리지 않게 텍스트가 길어져도 잘리지 않게 텍스트가 길어져도 잘리지 않게
date: '2022-10-10'
featured: 3
category: Trouble Shooting
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
