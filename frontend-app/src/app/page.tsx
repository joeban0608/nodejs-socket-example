import NewPostBtn from "./components/NewPostBtn";
import { PostInfo } from "./components/Post";
import PostList from "./components/PostList";

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
export default async function Home() {
  const postList = await getPostList();
  return (
    <main className="p-4 flex flex-col justify-center items-center gap-4">
      <NewPostBtn />
      <PostList postList={postList}/>
    </main>
  );
}
