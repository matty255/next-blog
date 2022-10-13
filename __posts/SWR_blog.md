---
slug: 'SWR_blog'
title: stale-while-revalidate 공부하기
image: https://pbs.twimg.com/profile_images/1147451112082907136/vFrE8I5p_400x400.png
description: swr을 공부하고 최적화기법 적용후 블로깅하기.
date: '2022-10-13'
featured: 4
---

# stale-while-revalidate 이란!

### `stale-while-revalidate` 이란 무엇이고, 어떤 메커니즘을 가지고 있나요?

- **stale-while-revalidate**는 데이터 패칭을 위한 전략적 개념입니다.
  일단은 일정 간격으로 계속 실행되어서 사용자가 데이터 업데이트 시점에 대해 고민할 필요를 줄여줍니다. 하지만 계속 실행되면 데이터를 많이 먹으므로 실행시에 매번 서버와 통신하지는 않습니다.

- 만약 실행 버튼이 눌러졌을때 **stale time = 유효기간**이 지나지 않은 상태라면 캐시 요청 없이 기존 데이터를 보여주고, 지났으면 새로 서버로 요청을 보내서 데이터를 갱신하고 새로 유효기간을 세팅합니다.

- 이 방식을 활용하는 라이브러리로는 TanStack-Query, SWR이 있습니다.

### `Server State`와 `UI State`는 어떻게 다른가요?

- server state
  server state는 서버에서 받아서 쿼리키 안에 배치한, next.js 앱 내에서 관리되는 state를 이야기합니다. 서버 스테이트는 서버에서 받아온 순간 언젠가 상할 데이터가 되기 때문에 주기적인 업데이트가 필요합니다. 또한 받아온게 실패할 가능성에 대비해서 대신 보여줄 화면같은걸 준비해주는게 좋습니다.

- UI State
  next.js에서는 리액트 스테이트인데 클라이언트 스테이트입니다. 서버 스테이트와 달리 클라이언트가 조작하는 대로 변화하기 때문에 유효기간을 따지지 않고 항상 최신 상태를 유지합니다. 새로고침하면 날아가긴 하는데 브라우저 스토리지 같은데에 저장해두면 다시 불러와서 쓸 수 있습니다. **stale-while-revalidate** 전략을 쓰는 라이브러리를 사용하면 서버스테이트와 UI스테이트를 쉽게 연동할 수 있습니다.

## Next.js 공식 문서를 읽고 최소 한 가지의 최적화 기법을 적용

- 이미지 컴포넌트를 사용한 최적화

- 레이아웃 템플릿 https://nextjs.org/docs/basic-features/layouts

- 폰트 다운받기 https://nextjs.org/docs/basic-features/font-optimization

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
