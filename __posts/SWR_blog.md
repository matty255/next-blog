---
slug: 'SWR_blog'
title: stale-while-revalidate 공부하기
image: https://3.bp.blogspot.com/-NNzcDmnNWAg/WtMKIzocHsI/AAAAAAAADcM/rtLlxb9IJ2oxJe-FKS_WCyeEkgL52FRowCLcBGAs/s1600/1.gif
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

## **Next.js 공식 문서를 읽고 최적화 기법을 적용하기**

### image component를 사용한 최적화

html에 있는 img 태그 대신에 **Next.js**에서 제공하는 image component를 사용하면 다음과 같은 이점들이 있습니다.

```js
import Image from 'next/image'

...

<Image src={post.image} alt="" width={150} height={150} />

```

### 1. lazy loading

이미지는 뷰포트에 들어온 다음에 로드되고, 이미지 로드 전 걸어둘 빈 박스도 커스텀할 수 있습니다. priority 속성(우선 로딩)을 넣지 않으면 기본 설정은 **lazy**입니다. 레이지 루트를 지정하면 뷰포트가 아닌 해당 컴포넌트에 접근했을때 로딩된다고 합니다.

```javascript
import Image from 'next/image';
...
<CoverImage
  lazyRoot={lazyRoot}
  src={post.image}
  alt=""
  width={150}
  height={150}
  placeholder="blur"
  blurDataURL={'./1x1-ffff007f.png'}
/>
```

이렇게 플레이스홀더 속성을 넣으면 로딩전 블러이펙트도 생기고 **Cumulative Layout Shift**(이미지 로딩 전에 레이아웃이 찌그러지는 현상)이 방지되어 좋습니다.

### 2. 이미지 압축 기능

내부 이미지 뿐만 아니라 외부 서버에서 가져온 이미지도 손쉽게 압축해서 내보내줍니다. 고화질의 이미지를 귀찮은 변환없이 사용할 수 있습니다. 압축률 조절도 가능합니다. 이 프로젝트에선 자동압축을 사용했습니다.

### 3. 폰트 최적화 기능

글꼴 선언 파일을 가져오기 위한 추가 네트워크 왕복을 제거하여 FCP(First Contentful Paint) 및 LCP(Large Contentful Paint)를 개선합니다. custom한 doucment.tsx 파일에 웹폰트의 링크를 등록하기만 하면 됩니다. 다운받아서 쓰는 글꼴에는 적용되지 않는 최적화입니다.

> https://nextjs.org/docs/basic-features/font-optimization
> ----> 공식문서!

이렇게 각 포스트를 서버에 캐시로 담고 이미지와 폰트를 최적화해보았습니다. 꽤 느린 vercel 무료버전으로 배포했는데도 최초 로딩 이후엔 눈에 띄게 빨라져서 만족스러웠습니다.
