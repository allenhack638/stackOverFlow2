import React from "react";
const Avatar = ({
  children,
  backgroundColor,
  width,
  height,
  color,
  borderRadius,
  fontSize,
  cursor,
}) => {
  const style = {
    backgroundColor,
    width,
    height,
    color: color || "black",
    borderRadius,
    fontSize,
    textAlign: "center",
    cursor: cursor || null,
    textDecoration: null,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0",
  };
  return <div style={style}>{children}</div>;
};
export default Avatar;
