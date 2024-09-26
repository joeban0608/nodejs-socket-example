import Link from "next/link";
import React from "react";
import EditPostBtn from "./EditPostBtn";
import DeletePostBtn from "./DeletePostBtn";

export interface PostInfo {
  id: string;
  title: string;
  description: string;
  link: string;
}

const Post = (postInfo: PostInfo) => {
  return (
    <div className="card bg-slate-400 shadow-xl w-full">
      <div className="card-body">
        <Link
          href={postInfo.link ? postInfo.link : `#${postInfo.id}`}
          className="group"
        >
          {/* 標題 */}
          <h1 className="text-xl font-bold text-indigo-600 group-hover:text-indigo-700 transition-colors duration-300">
            {postInfo.title}
          </h1>

          {/* 描述 */}
          <p className="text-indigo-500 group-hover:text-indigo-600 transition-colors duration-300">
            {postInfo.description}
          </p>
        </Link>
        <p className="font-serif font-semibold">Article ID : {postInfo.id}</p>
        <div className="flex justify-end pt-4 gap-4">
          <DeletePostBtn {...postInfo} />
          <EditPostBtn {...postInfo} />
        </div>
      </div>
    </div>
  );
};

export default Post;
