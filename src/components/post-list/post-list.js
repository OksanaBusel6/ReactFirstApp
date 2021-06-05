import React from "react";

import PostListItem from "../post-list-item";
import "./post-list.css";

const PostList = ({ posts, onDelete, onToggleImportent, onToggleLiked }) => {
  const newPosts = posts.filter((post) => typeof post == "object" && isEmpty(post));

  const elements = newPosts.map((item) => {
    const { id, ...itemProps } = item;
    return (
      <li key={id} className="list-group-item">
        <PostListItem
          {...itemProps}
          onDelete={() => onDelete(id)}
          onToggleImportent={() => onToggleImportent(id)}
          onToggleLiked={() => onToggleLiked(id)}/>
      </li>
    );
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
