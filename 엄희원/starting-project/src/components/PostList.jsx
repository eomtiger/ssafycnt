import NewPost from "./NewPost.jsx";
import Post from "./Post.jsx";
import classes from "./PostList.module.css";

function PostList() {
  return (
    <>
      <NewPost />
      <ul className={classes.posts}>
        <Post author="heewon" body="react good" />
        <Post author="max" body="react good max" />
      </ul>
    </>
  );
}

export default PostList;
