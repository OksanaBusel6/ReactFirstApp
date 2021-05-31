import React from "react";

import PostListItem from "../post-list-item";
import "./post-list.css";

const PostList = ({ posts, onDelete }) => {
  const newPosts = posts.filter((post) => typeof post == "object");
  const elements = newPosts.map((item) => {
    if (isEmpty(item)) {
      const { id, ...itemProps } = item;
      return (
        <li key={id} className="list-group-item">
          <PostListItem {...itemProps} onDelete={() => onDelete(id)} />
        </li>
      );
    }
  });

  function isEmpty(obj) {
    for (const key in obj) {
      return true;
    }

    return false;
  }

  return <ul className="app-list list-group">{elements}</ul>;
};

export default PostList;
