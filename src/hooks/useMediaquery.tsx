import { useEffect, useState } from "react";

// TypeScript를 위한 타입 정의
type MediaQuery = string;

const useMediaQuery = (query: MediaQuery = "(min-width: 768px)"): boolean => {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    // 서버 사이드 렌더링과 관련된 문제를 피하기 위해 window 객체 존재 여부 확인
    if (typeof window === "undefined") {
      return;
    }

    const mediaQueryList = window.matchMedia(query);

    const documentChangeHandler = () => setMatches(mediaQueryList.matches);

    mediaQueryList.addEventListener("change", documentChangeHandler);

    // Cleanup function
    return () => {
      mediaQueryList.removeEventListener("change", documentChangeHandler);
    };
  }, [query]); // query가 변경될 때마다 effect를 재실행

  return matches;
};

export default useMediaQuery;
