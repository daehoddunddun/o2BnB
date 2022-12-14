import React, { useEffect, useState } from "react";
import styled from "styled-components";
import WishMap from "./WishMap";
import WishLike from "./WishLike";
import { ImShare2 } from "react-icons/im";
import { MdMoreHoriz } from "react-icons/md";
import Slider from "react-slick";
import theme from "../../styles/theme";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

function WishList() {
  const accessToken = localStorage.getItem("TOKEN");

  const navigate = useNavigate();

  const [wishData, setWishData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mapData, setMapData] = useState({
    id: 0,
    lat: 35.795872678665454,
    long: 127.11140489302386,
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
  };

  const moveItemDetail = id => {
    navigate(`/item-detail/${id}`);
  };

  const starFilter = item => {
    if (item === null) {
      return "NEW";
    } else {
      return Math.floor(item * 100) / 100;
    }
  };

  const priceFilter = item => {
    let priceData = item;
    let fomatting = priceData.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return fomatting;
  };

  const clickMap = data => {
    setMapData({ id: data.id, lat: data.lat, long: data.long });
  };

  useEffect(() => {
    fetch("http://10.58.52.191:3000/likes", {
      headers: {
        authorization: accessToken,
      },
    })
      .then(response => response.json())
      .then(result => {
        setWishData(result.message);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <WishWrap>
          <WishLeftWrap>
            <IconBox>
              <WishTitle>위시리스트</WishTitle>
              <IconPositionBox>
                <ImShare2 size="18px" cursor="pointer" />
                <MdMoreHoriz size="30px" cursor="pointer" />
              </IconPositionBox>
            </IconBox>
            <WishScrollWrap>
              {wishData.map(item => {
                return (
                  <ContentsWrap
                    key={item.product_id}
                    onClick={() =>
                      clickMap({
                        id: item.product_id,
                        lat: item.latitude,
                        long: item.longitude,
                      })
                    }
                  >
                    <ImgTest>
                      <StyledSlider {...settings}>
                        {item.image_url.map(list => {
                          return (
                            <ImgBox
                              key={list.id}
                              onClick={() => {
                                moveItemDetail(item.product_id);
                              }}
                            >
                              <ContentsImg src={list} />
                            </ImgBox>
                          );
                        })}
                      </StyledSlider>
                    </ImgTest>
                    <ContentsIntroWrap>
                      <IntroTitle>{item.address}</IntroTitle>
                      <IntroText>{item.content}</IntroText>
                      <IntroRoom>
                        최대 인원 {item.guest_count}명, 원룸, 침대
                        {item.bed_count}
                        개, 욕실 {item.bathroom_count}개
                      </IntroRoom>
                      <IntroMorebox>
                        <IntroStar>★{starFilter(item.reviewStar)}</IntroStar>
                        <IntroPrice>{priceFilter(item.price)}원/박</IntroPrice>
                      </IntroMorebox>
                    </ContentsIntroWrap>
                    <WishLike
                      themeGrey={theme.color.grey}
                      themeBlack={theme.color.black}
                      themePink={theme.color.pink}
                      id={item.product_id}
                    />
                  </ContentsWrap>
                );
              })}
            </WishScrollWrap>
          </WishLeftWrap>
          <WishRightBox>
            <WishMap mapData={mapData} />
          </WishRightBox>
        </WishWrap>
      )}
    </div>
  );
}

export default WishList;

const WishWrap = styled.div`
  display: flex;
`;

const WishLeftWrap = styled.div`
  width: 950px;
  height: 85vh;
`;

const WishRightBox = styled.div`
  position: relative;
  width: 55%;
  height: 85vh;
  margin-top: 49px;
`;

const IconBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 50px;
  padding-right: 5px;
`;

const WishScrollWrap = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;

const IconPositionBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 60px;
  height: 40px;
`;

const WishTitle = styled.div`
  width: 100%;
  height: 50px;
  padding: 15px 0 0 40px;
  font-size: 30px;
  font-weight: 700;
`;

const ContentsWrap = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid #d3d4d4ac;
  border-width: 30%;
  padding: 10px;
  &:hover {
    background-color: #d3d4d4ac;
  }
`;

const ImgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  width: 400px;
`;

const ContentsImg = styled.img`
  width: 300px;
  height: 200px;
  padding-left: 20px;
`;

const ContentsIntroWrap = styled.div`
  width: 520px;
  margin-top: 25px;
  margin-right: 30px;
  margin-left: 20px;
`;

const IntroTitle = styled.p`
  font-size: 16px;
  color: gray;
`;

const IntroText = styled.p`
  margin-top: 5px;
  font-size: 20px;
  width: 500px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #000000;
`;

const IntroRoom = styled.p`
  margin-top: 10px;
  font-size: 15px;
  color: #000000;
`;

const IntroMorebox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 30px;
  margin-top: 120px;
`;

const IntroStar = styled.p`
  font-size: 20px;
  color: #000000;
`;

const IntroPrice = styled.p`
  font-size: 20px;
  color: #000000;
`;

const ImgTest = styled.p`
  width: 340px;
  height: 280px;
`;

const StyledSlider = styled(Slider)`
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }
`;
