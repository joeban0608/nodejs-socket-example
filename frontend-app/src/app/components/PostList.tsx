"use client";
import React, { useEffect, useState } from "react";
import Post, { PostInfo } from "./Post";
import { io } from "socket.io-client";
import useSWR from "swr";

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
export type GetPostListRes = {
  data: PostInfo[];
};
export const getPostList = async () => {
  try {
    const res = await fetch("http://localhost:8000/post-list");
    if (!res.ok) {
      throw new Error("Get post list Response error.");
    }
    const getPostListRes = (await res.json()) as GetPostListRes;
    return getPostListRes.data;
  } catch (err) {
    console.log("Get post list err:", err);
    return [];
  }
};

const PostList = () => {
  const {
    data: postList,
    //  error,
    isValidating,
    mutate,
  } = useSWR("/post-list", getPostList, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const socket = io("http://localhost:8000");
  socket.on("posts", (data) => {
    if (data.action === "create") {
      mutate();
    } else if (data.action === "update") {
      mutate();
    } else if (data.action === "delete") {
      console.log("delete");
    }
  });
  return (
    <section className="flex flex-col gap-4">
      {postList?.map((postInfo) => {
        return <Post key={postInfo.id} {...postInfo} />;
      })}
    </section>
  );
};

export default PostList;
