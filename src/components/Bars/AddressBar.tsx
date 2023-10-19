import { PostData } from "@/types/common";
import Link from "next/link";
import { useRouter } from "next/router";
export default function AddressBar({
  allPostsData,
  postData,
}: {
  allPostsData?: PostData[];
  postData?: PostData;
}) {
  const router = useRouter();
  const { pathname } = router;
  const { category } = router.query;
  function removeForwardSlash(pathname: string) {
    if (pathname === "/[category]") return category;
    if (pathname.startsWith("/")) {
      return pathname.substring(1);
    }
    return pathname;
  }
  function findCategoryById({
    allPostsData,
    postData,
  }: {
    allPostsData?: PostData[];
    postData?: PostData;
  }) {
    if (allPostsData?.length && postData?.id) {
      const matchingPost = allPostsData.find((post) => post.id === postData.id);
      return matchingPost ? matchingPost.category : null;
    }
  }
  console.log(pathname);

  return (
    <div className="pl-2 shadow-md sticky top-11 bg-blue-200 dark:bg-slate-700 font-godo-b">
      <div className="inline-flex gap-x-2 text-slate-800 dark:text-slate-200">
        {`src`} {`>`}
        {postData?.id ? (
          <Link href={`/${findCategoryById({ allPostsData, postData })}`}>
            {postData?.id
              ? `${findCategoryById({ allPostsData, postData })} > `
              : ""}
          </Link>
        ) : (
          <></>
        )}
        <p>
          {postData?.id
            ? postData?.id
            : pathname !== "/"
            ? `${removeForwardSlash(pathname)}`
            : "home"}
          {pathname !== "/[category]" && ".tsx"}
        </p>
      </div>
    </div>
  );
}
