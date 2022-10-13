import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

function Like({ themeGrey, themePink, checkLike, id }) {
  const [isLike, setIsLike] = useState(Boolean(Number(checkLike)));

  const likeBtn = id => {
    setIsLike(!isLike);
    if (isLike != true) {
      fetch(`http://10.58.52.191:3000/likes/${id}`, {
        method: "POST",
        headers: {
          authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo2LCJpYXQiOjE2NjUwNDA5NzZ9.y1_aofAxEpehGwNCCLnOYXnnaz05LCXYwdwJDfjOF8I",
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(),
      })
        .then(response => response.json())
        .then(result => console.log("좋아요", result));
    } else {
      fetch(`http://10.58.52.191:3000/likes/${id}`, {
        method: "DELETE",
        headers: {
          authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo2LCJpYXQiOjE2NjUwNDA5NzZ9.y1_aofAxEpehGwNCCLnOYXnnaz05LCXYwdwJDfjOF8I",
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(),
      })
        .then(response => response.json())
        .then(result => console.log("좋아요 취소", result));
    }
  };

  return (
    <div>
      {isLike ? (
        <AiFillHeart
          size="30px"
          cursor="pointer"
          color={themePink}
          onClick={() => {
            likeBtn(id);
          }}
        />
      ) : (
        <AiOutlineHeart
          size="30px"
          cursor="pointer"
          color={themeGrey}
          onClick={() => {
            likeBtn(id);
          }}
        />
      )}
    </div>
  );
}

export default Like;
