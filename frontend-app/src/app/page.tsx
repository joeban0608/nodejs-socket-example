import NewPostBtn from "./components/NewPostBtn";
import Post from "./components/Post";
const mockPostList = [
  {
    id: "1",
    title:
      "NASA spacecraft to probe possibility of life in Europa's salty ocean (science.org)",
    description: "69 points by pseudolus 4 hours ago | hide | 29 comments",
    url: "#1",
  },
  {
    id: "2",
    title: "456",
    description: "456",
    url: "#2",
  },
];
export default function Home() {
  return (
    <main className="p-4 flex flex-col justify-center items-center gap-4">
      <NewPostBtn />
      {mockPostList.map((postInfo) => {
        return <Post key={postInfo.id} {...postInfo} />;
      })}
    </main>
  );
}
