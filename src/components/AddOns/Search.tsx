import React, { useState, ChangeEvent, KeyboardEvent } from "react";

import { useRecoilState } from "recoil";
import { PostData } from "@/types/common";
import Link from "next/link";
import { useRouter } from "next/router";
export default function Search({
  allPostsData,
}: {
  allPostsData?: PostData[];
}) {
  // const [allPostsData, setAllPostsData] = useRecoilState(
  //   allPostsDataState ?? []
  // );
  const router = useRouter();

  // console.log(allPostsData);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredPosts, setFilteredPosts] = useState<PostData[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query === "") {
      setFilteredPosts([]);
    } else {
      const filtered = allPostsData
        ? allPostsData.filter((post: PostData) =>
            post.title.toLowerCase().includes(query.toLowerCase())
          )
        : [];
      setFilteredPosts(filtered);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prevIndex) =>
        prevIndex === null || prevIndex >= filteredPosts.length - 1
          ? 0
          : prevIndex + 1
      );
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prevIndex) =>
        prevIndex === null || prevIndex <= 0 ? null : prevIndex - 1
      );
    } else if (e.key === "Enter") {
      if (selectedIndex !== null) {
        const selectedPost = filteredPosts[selectedIndex];
        setSearchQuery(selectedPost.title);

        // 페이지 이동
        router.push(`/${selectedPost.category}/${selectedPost.id}`);
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="text"
        placeholder="Search by title..."
        value={searchQuery}
        onChange={handleSearch}
        onKeyDown={handleKeyPress}
        className="p-2 border rounded focus:outline-none focus:border-blue-500 text-gray-400"
      />
      <ul className="mt-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <li
              key={post.id}
              className={`p-4 rounded ${
                index === selectedIndex ? "bg-gray-200" : ""
              }`}
            >
              <Link href={`/${post.category}/${post.id}`}>{post.title}</Link>
            </li>
          ))
        ) : (
          <li className="p-4 text-gray-500">No results found</li>
        )}
      </ul>
    </div>
  );
}
