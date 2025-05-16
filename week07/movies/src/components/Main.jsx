import React from "react";
import styled from "styled-components";

const MainComponent = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MainText = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px;
  font-size: 38px;
  font-weight: bold;

  opacity: 0; //처음에는 투명
  transform: translateY(20px); //처음에는 아래에서
  animation: fadeInUp 0.8s ease-out forwards;

  // @keyframes는 CSS 애니메이션에서 언제 어떤 스타일로 바뀔지 지정하는 문법
  @keyframes fadeInUp {
    to {
      //끝 상태
      opacity: 1; //서서히 나타남
      transform: translateY(0); //더 위로 올라옴
    }
  }
`;

const Main = ({ children }) => {
  return (
    <>
      <MainText>오늘은 어떤 영화와 함께 할까요?</MainText>
      <MainComponent>{children}</MainComponent>
    </>
  );
};

export default Main;
