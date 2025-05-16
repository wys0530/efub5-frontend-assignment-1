import React from "react";
import styled from "styled-components";
import { IoLanguage } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 3px;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  padding: 3px 10px;
`;

const Logo = styled.img`
  width: 180px;
  height: auto;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  padding: 3px 7px;
`;

const LanguageBtn = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  line-height: 1.25rem;
  padding: 0.375rem 1.5rem;

  background: transparent;
  border: 1px solid white;
  border-radius: 0.25rem;
  margin: 0px 10px;
  min-height: 15px;
  min-width: 15px;
`;

const LoginBtn = styled.button`
  border: 0;
  cursor: pointer;
  fill: currentColor;
  position: relative;
  transition-duration: 250ms;
  transition-property: background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.68, 0.06);
  vertical-align: text-top;
  width: auto;
  font-size: 0.875rem;
  font-weight: 500;
  min-height: 2rem;
  padding: 0.25rem 1rem;
  border-radius: 0.25rem;
  background: rgb(229, 9, 20);
  color: rgb(255, 255, 255);
`;

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderLeft>
        <Logo
          src="https://newsimg.sedaily.com/2021/07/06/22OT2YLPID_1.png"
          alt="넷플릭스 로고"
        />
      </HeaderLeft>
      <HeaderRight>
        <LanguageBtn>
          <IoLanguage />
          한국어
          <IoMdArrowDropdown />
        </LanguageBtn>
        <LoginBtn>로그인</LoginBtn>
      </HeaderRight>
    </HeaderContainer>
  );
};

export default Header;
