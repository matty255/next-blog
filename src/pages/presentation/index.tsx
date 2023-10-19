import ScrollSnap from "@/common/ScrollSnap";
import { getSortedPostsData } from "@/lib/MakePosts";
import { GetStaticPropsContext } from "next";
import { withDataFetch } from "../../../hoc/withDataFetch";

const components = [
  <div key="1">슬라이드 가능한 프레젠테이션 페이지</div>,
  <div key="2">Page 2</div>,
  <div key="3">Page 3</div>,
  // ... more components
];

function Presentation() {
  return (
    <div className="relative overflow-hidden w-full h-full rounded-xl ">
      <ScrollSnap components={components} />
    </div>
  );
}

export default withDataFetch(Presentation);

export async function getStaticProps(context: GetStaticPropsContext) {
  const { params } = context;
  const locale = context.locale ?? "ko"; // 로케일 정보 가져오기
  const allPostsData = getSortedPostsData(locale);
  const allCategories: string[] = Array.from(
    new Set(allPostsData.map((post) => post.category))
  );
  return {
    props: {
      allPostsData,
      allCategories,
    },
  };
}
