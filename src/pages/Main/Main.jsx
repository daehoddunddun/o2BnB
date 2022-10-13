import React, { useEffect, useState } from "react";
import styled from "styled-components";
import theme from "../../styles/theme";
import List from "./List";
import Menu from "./Menu";
import Loading from "../../components/Loading/Loading";

function Main() {
  const accessToken = localStorage.getItem("TOKEN");

  const [currTab, setCurrTab] = useState("all");
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(true);

  const chageCurrTab = id => {
    setCurrTab(id);
  };

  useEffect(() => {
    if (accessToken != undefined) {
      setLoading(true);
      fetch(`http://10.58.52.191:3000/product/${currTab}`, {
        headers: {
          authorization: accessToken,
        },
      })
        .then(response => response.json())
        .then(result => {
          setListData(result.message);
          setLoading(false);
        });
    } else {
      setLoading(true);
      fetch(`http://10.58.52.191:3000/product/${currTab}`)
        .then(response => response.json())
        .then(result => {
          setListData(result.message);
          setLoading(false);
        });
    }
  }, [currTab]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <MainBox>
          <Menu
            themeGrey={theme.color.grey}
            themeBlack={theme.color.black}
            listData={listData}
            setListData={setListData}
            chageCurrTab={chageCurrTab}
            setLoading={setLoading}
          />
          <List
            themeGrey={theme.color.grey}
            themeBlack={theme.color.black}
            themePink={theme.color.pink}
            listData={listData}
          />
        </MainBox>
      )}
    </div>
  );
}

const MainBox = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.color.white};
`;

export default Main;
