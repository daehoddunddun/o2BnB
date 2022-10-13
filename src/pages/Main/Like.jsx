import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

function Like({ themeGrey, themePink, checkLike, id }) {
  const accessToken = localStorage.getItem("TOKEN");
  const [isLike, setIsLike] = useState(Boolean(Number(checkLike)));

  const likeBtn = id => {
    setIsLike(!isLike);
    if (isLike != true) {
      fetch(`http://10.58.52.191:3000/likes/${id}`, {
        method: "POST",
        headers: {
          authorization: accessToken,
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(),
      }).then(response => response.json());
    } else {
      fetch(`http://10.58.52.191:3000/likes/${id}`, {
        method: "DELETE",
        headers: {
          authorization: accessToken,
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(),
      }).then(response => response.json());
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
