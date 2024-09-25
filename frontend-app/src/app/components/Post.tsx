import Link from "next/link";
import React from "react";

export interface PostInfo {
  id: string;
  title: string;
  description: string;
  link: string;
}

const Post = ({ id, title, description, link }: PostInfo) => {
  return (
    <div className="card bg-slate-400 shadow-xl w-full">
      <div className="card-body">
        <Link href={link ? link : `#${id}`} className="group">
          {/* 標題 */}
          <h1 className="text-xl font-bold text-indigo-600 group-hover:text-indigo-700 transition-colors duration-300">
            {title}
          </h1>

          {/* 描述 */}
          <p className="text-indigo-500 group-hover:text-indigo-600 transition-colors duration-300">
            {description}
          </p>
        </Link>
        <p className="font-serif font-semibold">Article ID : {id}</p>
      </div>
    </div>
  );
};

export default Post;
