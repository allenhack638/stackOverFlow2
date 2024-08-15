import React from "react";
function Widgettags() {
  const tags = [
    "c",
    "css",
    "express",
    "frebase",
    "html",
    "java",
    "javascript",
    "mern",
    "mongodb",
    "mysql",
    "next.js",
    "node.js",
    "php",
    "python",
    "react.js",
  ];
  return (
    <div className="widget-tags">
      <h4>Watched Tags</h4>
      <div className="widget-tags-div">
        {tags.map((tag, index) => {
          return <p key={index}>{tag}</p>;
        })}
      </div>
    </div>
  );
}
export default Widgettags;
