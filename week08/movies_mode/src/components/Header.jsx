import React from "react";
import styled from "styled-components";
import { IoLanguage } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import { FiSun, FiMoon } from "react-icons/fi";

import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../store/themeSlice";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 3px;
  color: ${({ theme }) => theme.color};
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

  border: 1px solid ${({ theme }) => theme.color};
  border-radius: 0.25rem;
  margin: 0px 10px;
  min-height: 15px;
  min-width: 15px;
  background-color: transparent;
  color: ${({ theme }) => theme.color};
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

const ThemeToggleBtn = styled.button`
  margin-left: 10px;
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.color};
  border: 1px solid gray;
  border-radius: 999px;
  cursor: pointer;
  position: relative;
  width: 60px;
  height: 30px;
`;

const ThemeToggleCircle = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${({ theme }) => theme.background};
  border-radius: 50%;
  position: absolute;
  top: 4px;
  left: ${({ isDark }) => (isDark ? "34px" : "4px")};
  transition: left 0.3s ease;
`;

const ThemeIcons = styled.div`
  transition: opacity 0.3s ease;
  margin-top: 4px;
  font-size: 25px;
  position: absolute;

  &.sun {
    opacity: ${({ isDark }) => (isDark ? 0 : 1)};
  }

  &.moon {
    opacity: ${({ isDark }) => (isDark ? 1 : 0)};
  }
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
`;

const ToggleContainer = styled.div`
  display: flex;
  gap: 27px;
  align-items: center;
`;

const Header = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);
  const isDark = mode === "dark";
  return (
    <HeaderContainer>
      <HeaderLeft>
        <Logo
          src="https://newsimg.sedaily.com/2021/07/06/22OT2YLPID_1.png"
          alt="넷플릭스 로고"
        />
      </HeaderLeft>
      <HeaderRight>
        <ToggleContainer>
          <IconContainer>
            <ThemeIcons className="sun" isDark={isDark}>
              <FiSun />
            </ThemeIcons>
            <ThemeIcons className="moon" isDark={isDark}>
              <FiMoon />
            </ThemeIcons>
          </IconContainer>
          <ThemeToggleBtn onClick={() => dispatch(toggleTheme())}>
            <ThemeToggleCircle isDark={isDark} />
          </ThemeToggleBtn>
        </ToggleContainer>
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
