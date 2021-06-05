import React from "react";

import "./post-list-item.css";

const PostListItem = (props) => {

  const { label, onDelete, onToggleImportent, onToggleLiked, important, like } = props;
  let classNames = "app-list-item d-flex justify-content-between";

  if (important) {
    classNames += " important";
  }

  if (like) {
    classNames += " like";
  }

  return (
    <div className={classNames}>
      <span
        className="app-list-item-label"
        onClick={onToggleLiked}>
        {label}
      </span>
      <div className="d-flex justify-content-center align-items-center">
        <button
          type="button"
          className="btn-star btn-sm"
          onClick={onToggleImportent}
        >
          <i className="fa fa-star"></i>
        </button>
        <button
          type="button"
          className="btn-trash btn-sm"
          onClick={onDelete}>
          <i className="fa fa-trash"></i>
        </button>
        <i className="fa fa-heart"></i>
      </div>
    </div>
  );
}

export default PostListItem;