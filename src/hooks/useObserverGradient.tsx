import { useEffect, useState, useRef, MutableRefObject } from "react";

const useIntersectionObserver = (): [number, MutableRefObject<null>] => {
  const [gradientOpacity, setGradientOpacity] = useState<number>(1);
  const ref = useRef<null>(null);

  useEffect(() => {
    const currentRef = ref.current; // 로컬 변수에 할당

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setGradientOpacity(entry.isIntersecting ? 1 : 0);
      },
      {
        root: null,
        threshold: 1.0,
      }
    );

    if (currentRef) {
      observer.observe(currentRef as Element);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef as Element); // 로컬 변수를 사용
      }
    };
  }, []); // 의존성 배열은 빈 배열로 둡니다.

  return [gradientOpacity, ref];
};

export default useIntersectionObserver;
