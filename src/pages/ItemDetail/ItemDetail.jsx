import React, { useEffect, useState } from "react";
import ItemDetailTitle from "./components/ItemDetailTitle";
import ItemDetailImages from "./components/ItemDetailImages";
import ItemDetailInfo from "./components/ItemDetailInfo/ItemDetailInfo";
import ItemDetailReview from "./components/ItemDetailReview/ItemDetailReview";
import ItemDetailMap from "./components/ItemDetailMap";
import ItemDetailHost from "./components/ItemDetailHost";

function ItemDetail() {
  const [detail, setDetail] = useState(null);
  const [reviewData, setReviewData] = useState({ star: null, reviews: [] });

  useEffect(() => {
    fetch(`http://10.58.52.191:3000/product/detail/${3}`, {
      method: "GET",
      headers: {
        authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo2LCJpYXQiOjE2NjUwNDA5NzZ9.y1_aofAxEpehGwNCCLnOYXnnaz05LCXYwdwJDfjOF8I",
      },
    })
      .then(res => res.json())
      // .then(data => console.log(data));
      .then(data => setDetail(data))
      .catch(error => console.log(error));

    fetch(`http://10.58.52.191:3000/reviews/1`, {
      method: "GET",
      headers: {
        authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo2LCJpYXQiOjE2NjUwNDA5NzZ9.y1_aofAxEpehGwNCCLnOYXnnaz05LCXYwdwJDfjOF8I",
      },
    })
      .then(res => res.json())
      .then(({ data }) => {
        setReviewData({ star: data.stars[0], reviews: data.reviews });
      })
      .catch(error => console.log(error));
  }, []);
  return (
    <>
      {detail && (
        <ItemDetailTitle
          detail={detail.message}
          star={reviewData.star}
          hostInfo={detail.message.hostInfo}
        />
      )}
      {detail && <ItemDetailImages detail={detail.message} />}
      {detail && (
        <ItemDetailInfo
          detail={detail.message}
          hostInfo={detail.message.hostInfo}
        />
      )}
      <ItemDetailReview star={reviewData.star} reviews={reviewData.reviews} />
      {detail && <ItemDetailMap detail={detail.message} />}
      {detail && (
        <ItemDetailHost
          hostInfo={detail.message.hostInfo}
          reviews={reviewData}
        />
      )}
    </>
  );
}

export default ItemDetail;
