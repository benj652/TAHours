import Posts from "../../components/feed/Posts";
import WritePost from "../../components/feed/WritePost";

const FeedPage = () => {
  return (
    <div className="flex flex-col">
      {
        // Skibidi nav bar
      }
      <Posts />
      <WritePost />
    </div>
  );
};

export default FeedPage;
