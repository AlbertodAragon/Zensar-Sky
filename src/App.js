import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Header from "./components/shared/header";
import Hero from "./components/hero";
import Section from "./layout/section";
import Wrapper from "./layout/wrapper";
import LaunchCard from "./components/launch-card";
import Clock from "./components/clock";

const MainWrapper = styled.main`
  display: block;
  position: relative;
  width: 100%;
`;

const GridContent = styled.div` 
  display:grid;
  gap: 10px;
  padding: 10px;
  margin: 0 auto;
  grid-template-columns: repeat(3, 1fr);
  @media only screen and (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const LoadingText = styled.div``;
const ShowError = styled.span``;

const ContentSelector = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: center;

  button {
    border: none;
    padding: 10px;
    min-width: 100px;
    margin-right: 10px;
  }
`;

function App() {
  const [data, setData] = useState({ launches: [] });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "https://api.spacexdata.com/v5/launches/past?_limit=12"
      );             
      setData({ launches: result.data });
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <MainWrapper>
      <Header />
      <Section>
        <Hero />
      </Section>
      <Section>
        <ContentSelector>
          <button>Launches</button>
          <button>rockets</button>
        </ContentSelector>
      </Section>
      <Section>
        <Clock/>
      </Section>
      <Section>
        {loading && <LoadingText>loading....</LoadingText>}
        {loading && (data.launches?.length === 0 || data.launches?.length === undefined) && <ShowError>No Data</ShowError>}

        {!loading && (data.launches.length !== 0 || data.launches?.length === undefined) && (
          <Wrapper>
            <GridContent>
              {data.launches.slice(0,12).map((item, index) => (
                <LaunchCard
                  key={index.toString()}
                  image={item.links.patch.small}
                  title={item.name}
                  description={item.details}   
                  link={item.links.article}               
                />
              ))}
            </GridContent>
          </Wrapper>
        )}
      </Section>
      
    </MainWrapper>
  );
}

export default App;
