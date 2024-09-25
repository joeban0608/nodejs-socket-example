import NewPostBtn from "./components/NewPostBtn";
import PostList from "./components/PostList";

export default async function Home() {
  return (
    <main className="p-4 flex flex-col justify-center items-center gap-4">
      <NewPostBtn />
      <PostList />
    </main>
  );
}
