import React, { useState } from "react";
import styled from "styled-components";
import { ResponsiveBar } from "@nivo/bar";

function FliterModal({ filterBtn, listData, setListData }) {
  const priceCalculator = [];
  listData.forEach(item => {
    priceCalculator.push(item.price);
  });

  const minPrice = Math.min.apply(null, priceCalculator);
  const maxPrice = Math.max.apply(null, priceCalculator);

  const [rangeMinPrice, setRangeMinPrice] = useState(minPrice);
  const [rangeMaxPrice, setRangeMaxPrice] = useState(maxPrice);

  //그래프
  const data = [
    {
      country: "AD",
      "hot dog": 168,
      "hot dogColor": "hsl(319, 70%, 50%)",
      burger: 124,
      burgerColor: "hsl(91, 70%, 50%)",
      sandwich: 197,
      sandwichColor: "hsl(80, 70%, 50%)",
      kebab: 107,
      kebabColor: "hsl(30, 70%, 50%)",
      fries: 108,
      friesColor: "hsl(120, 70%, 50%)",
      donut: 160,
      donutColor: "hsl(198, 70%, 50%)",
    },
    {
      country: "AE",
      "hot dog": 164,
      "hot dogColor": "hsl(346, 70%, 50%)",
      burger: 151,
      burgerColor: "hsl(65, 70%, 50%)",
      sandwich: 140,
      sandwichColor: "hsl(47, 70%, 50%)",
      kebab: 22,
      kebabColor: "hsl(237, 70%, 50%)",
      fries: 59,
      friesColor: "hsl(265, 70%, 50%)",
      donut: 196,
      donutColor: "hsl(344, 70%, 50%)",
    },
    {
      country: "AF",
      "hot dog": 195,
      "hot dogColor": "hsl(299, 70%, 50%)",
      burger: 115,
      burgerColor: "hsl(5, 70%, 50%)",
      sandwich: 48,
      sandwichColor: "hsl(108, 70%, 50%)",
      kebab: 180,
      kebabColor: "hsl(154, 70%, 50%)",
      fries: 154,
      friesColor: "hsl(306, 70%, 50%)",
      donut: 176,
      donutColor: "hsl(12, 70%, 50%)",
    },
    {
      country: "AG",
      "hot dog": 155,
      "hot dogColor": "hsl(208, 70%, 50%)",
      burger: 94,
      burgerColor: "hsl(334, 70%, 50%)",
      sandwich: 10,
      sandwichColor: "hsl(126, 70%, 50%)",
      kebab: 143,
      kebabColor: "hsl(250, 70%, 50%)",
      fries: 87,
      friesColor: "hsl(165, 70%, 50%)",
      donut: 31,
      donutColor: "hsl(202, 70%, 50%)",
    },
    {
      country: "AI",
      "hot dog": 161,
      "hot dogColor": "hsl(23, 70%, 50%)",
      burger: 31,
      burgerColor: "hsl(82, 70%, 50%)",
      sandwich: 51,
      sandwichColor: "hsl(168, 70%, 50%)",
      kebab: 140,
      kebabColor: "hsl(330, 70%, 50%)",
      fries: 153,
      friesColor: "hsl(337, 70%, 50%)",
      donut: 28,
      donutColor: "hsl(198, 70%, 50%)",
    },
    {
      country: "AL",
      "hot dog": 160,
      "hot dogColor": "hsl(235, 70%, 50%)",
      burger: 94,
      burgerColor: "hsl(65, 70%, 50%)",
      sandwich: 54,
      sandwichColor: "hsl(201, 70%, 50%)",
      kebab: 167,
      kebabColor: "hsl(76, 70%, 50%)",
      fries: 74,
      friesColor: "hsl(54, 70%, 50%)",
      donut: 152,
      donutColor: "hsl(64, 70%, 50%)",
    },
    {
      country: "AM",
      "hot dog": 95,
      "hot dogColor": "hsl(260, 70%, 50%)",
      burger: 14,
      burgerColor: "hsl(325, 70%, 50%)",
      sandwich: 70,
      sandwichColor: "hsl(178, 70%, 50%)",
      kebab: 43,
      kebabColor: "hsl(101, 70%, 50%)",
      fries: 113,
      friesColor: "hsl(123, 70%, 50%)",
      donut: 53,
      donutColor: "hsl(273, 70%, 50%)",
    },
  ];

  //레인지 바
  const prcieRangeMinValueHandler = e => {
    setRangeMinPrice(e.target.value);
  };
  const prcieRangeMaxValueHandler = e => {
    setRangeMaxPrice(e.target.value);
  };

  const test = () => {
    console.log("전달할 최소값", rangeMinPrice, "전달할 최댓값", rangeMaxPrice);

    fetch(
      `http://10.58.52.191:3000/product/priceFilter?lowprice=${rangeMinPrice}&highprice=${rangeMaxPrice}`,
      {
        headers: {
          authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo2LCJpYXQiOjE2NjUwNDA5NzZ9.y1_aofAxEpehGwNCCLnOYXnnaz05LCXYwdwJDfjOF8I",
        },
        body: JSON.stringify(),
      }
    )
      .then(response => response.json())
      .then(result => setListData(result.message));
    filterBtn();
  };

  return (
    <div>
      <ModalBack>
        <ModalBox>
          <ModalTitle>가격 범위</ModalTitle>
          <ModalIntro>평균 1박 요금은 ₩29,332원 입니다.</ModalIntro>
          <ChartBox>
            <ChartDiv>
              <ResponsiveBar
                data={data}
                keys={[
                  "hot dog",
                  "burger",
                  "sandwich",
                  "kebab",
                  "fries",
                  "donut",
                ]}
                indexBy="country"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                valueScale={{ type: "linear" }}
                indexScale={{ type: "band", round: true }}
                colors={{ scheme: "nivo" }}
                defs={[
                  {
                    id: "dots",
                    type: "patternDots",
                    background: "inherit",
                    color: "#38bcb2",
                    size: 4,
                    padding: 1,
                    stagger: true,
                  },
                  {
                    id: "lines",
                    type: "patternLines",
                    background: "inherit",
                    color: "#eed312",
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10,
                  },
                ]}
                fill={[
                  {
                    match: {
                      id: "fries",
                    },
                    id: "dots",
                  },
                  {
                    match: {
                      id: "sandwich",
                    },
                    id: "lines",
                  },
                ]}
                borderColor={{
                  from: "color",
                  modifiers: [["darker", 1.6]],
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "country",
                  legendPosition: "middle",
                  legendOffset: 32,
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "food",
                  legendPosition: "middle",
                  legendOffset: -40,
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{
                  from: "color",
                  modifiers: [["darker", 1.6]],
                }}
                legends={[
                  {
                    dataFrom: "keys",
                    anchor: "bottom-right",
                    direction: "column",
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: "left-to-right",
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                      {
                        on: "hover",
                        style: {
                          itemOpacity: 1,
                        },
                      },
                    ],
                  },
                ]}
                role="application"
                ariaLabel="Nivo bar chart demo"
                barAriaLabel={function (e) {
                  return (
                    e.id +
                    ": " +
                    e.formattedValue +
                    " in country: " +
                    e.indexValue
                  );
                }}
              />
            </ChartDiv>
            <FilterPriceSlide>
              <FilterPriceSlideInner />
              <FilterPriceRangeWrap>
                <FilterPriceRangeMin
                  type="range"
                  value={rangeMinPrice}
                  min={minPrice}
                  max={maxPrice}
                  onChange={e => {
                    prcieRangeMinValueHandler(e);
                  }}
                />
                <FilterPriceRangeMax
                  type="range"
                  value={rangeMaxPrice}
                  min={minPrice}
                  max={maxPrice}
                  onChange={e => {
                    prcieRangeMaxValueHandler(e);
                  }}
                />
              </FilterPriceRangeWrap>
            </FilterPriceSlide>
            <FilterInputWrap>
              <FilterMinInput>
                <FilterMinInputText>최저 요금</FilterMinInputText>
                <FilterMinInputPrice>{rangeMinPrice}</FilterMinInputPrice>
              </FilterMinInput>
              <InpustMiddle>-</InpustMiddle>
              <FilterMaxInput>
                <FilterMaxInputText>최고 요금</FilterMaxInputText>
                <FilterMaxInputPrice>{rangeMaxPrice}</FilterMaxInputPrice>
              </FilterMaxInput>
            </FilterInputWrap>
          </ChartBox>
          <OnFilter onClick={test}>확인</OnFilter>
        </ModalBox>
      </ModalBack>
    </div>
  );
}

export default FliterModal;

const ModalBack = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: #0000004b;
  z-index: 2;
`;

const ModalBox = styled.div`
  ${({ theme }) => theme.flexCenter}
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 400px;
  background-color: white;
  border-radius: 5px;
`;

const ModalTitle = styled.strong`
  position: absolute;
  top: 30px;
  left: 30px;
  font-size: 20px;
  color: black;
`;

const ModalIntro = styled.p`
  position: absolute;
  top: 60px;
  left: 30px;
  font-size: 18px;
  color: #616161;
`;

const ChartBox = styled.div`
  position: absolute;
  ${({ theme }) => theme.flexCenter}
  flex-direction: column;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 650px;
  height: 280px;
  border-radius: 5px;
`;

const FilterPriceSlide = styled.div`
  position: relative;
  height: 4px;
  width: 650px;
  border-radius: 10px;
  background-color: #dddddd;
`;

const FilterPriceSlideInner = styled.div`
  position: absolute;
  width: 35%;
  left: 30%;
  right: 30%;
  height: 4px;
  border-radius: 10px;
  /* background-color: #b0b0b0; */
`;

const FilterPriceRangeWrap = styled.div`
  position: relative;
`;

const FilterPriceRangeMin = styled.input`
  position: absolute;
  top: -5px;
  height: 7px;
  width: 100%;
  -webkit-appearance: none;
  background: none;
  pointer-events: none;

  &::-webkit-slider-thumb {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    border: 2px solid #b0b0b0;
    background-color: white;
    -webkit-appearance: none;
    pointer-events: auto;
  }
`;

const FilterPriceRangeMax = styled(FilterPriceRangeMin)``;

const FilterInputWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 680px;
  margin-top: 50px;
`;

const FilterMinInput = styled.div`
  width: 330px;
  height: 50px;
  border: 2px solid gray;
  border-radius: 5px;
`;

const FilterMinInputText = styled.p`
  font-size: 14px;
  margin: 8px;
`;

const FilterMinInputPrice = styled.p`
  font-size: 14px;
  margin: 8px;
`;

const InpustMiddle = styled.p`
  font-size: 20px;
`;

const FilterMaxInput = styled(FilterMinInput)``;
const FilterMaxInputText = styled(FilterMinInputText)``;
const FilterMaxInputPrice = styled(FilterMinInputPrice)``;

const OnFilter = styled.button`
  position: absolute;
  bottom: 30px;
  width: 70px;
  height: 30px;
  border: 1px solid gray;
  border-radius: 10px;
`;

const ChartDiv = styled.div`
  margin-top: -20px;
  width: 500px;
  height: 300px;
`;
