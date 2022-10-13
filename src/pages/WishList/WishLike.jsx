import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

function WishLike({ themeGrey, themePink, likeType, id }) {
  const [isLike, setIsLike] = useState(likeType);

  const accessToken = localStorage.getItem("TOKEN");

  const likeBtn = id => {
    setIsLike(!isLike);
    if (isLike == true) {
      console.log("위시", id);
      fetch(`http://10.58.52.191:3000/likes/${id}`, {
        method: "POST",
        headers: {
          authorization: accessToken,
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(),
      })
        .then(response => response.json())
        .then(result => console.log("위시 좋아요", result));
    } else {
      fetch(`http://10.58.52.191:3000/likes/${id}`, {
        method: "DELETE",
        headers: {
          authorization: accessToken,
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(),
      })
        .then(response => response.json())
        .then(result => console.log("위시 좋아요 취소", result));
    }
  };

  return (
    <div>
      {!isLike ? (
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

export default WishLike;
