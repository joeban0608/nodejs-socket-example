"use client";
import React from "react";
import Post, { PostInfo } from "./Post";

// const mockPostList = [
//   {
//     id: "1",
//     title:
//       "NASA spacecraft to probe possibility of life in Europa's salty ocean (science.org)",
//     description: "69 points by pseudolus 4 hours ago | hide | 29 comments",
//     url: "#1",
//   },
//   {
//     id: "2",
//     title: "456",
//     description: "456",
//     url: "#2",
//   },
// ];

const PostList = ({ postList }: { postList: PostInfo[] }) => {
  return (
    <section className="flex flex-col gap-4">
      {postList?.map((postInfo) => {
        return <Post key={postInfo.id} {...postInfo} />;
      })}
    </section>
  );
};

export default PostList;
