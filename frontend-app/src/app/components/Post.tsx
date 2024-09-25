import Link from "next/link";
import React from "react";

interface PostProps {
  title: string;
  description: string;
  url: string;
}

const Post = ({ title, description, url }: PostProps) => {
  return (
    <div className="card bg-slate-400 shadow-xl w-full">
      <Link href={url} className="card-body">
        {/* 標題 */}
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>

        {/* 描述 */}
        <p className="">{description}</p>
      </Link>
    </div>
  );
};

export default Post;
