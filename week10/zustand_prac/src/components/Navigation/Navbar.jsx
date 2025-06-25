import { Link } from "react-router-dom";
import styled from "styled-components";

const Navbar = () => {
  return (
    <Header>
      <NavWrapper>
        <Logo>🎵 Mellon...이 되고 싶었어요..</Logo>
        <Nav>
          <Link to="/">홈</Link>
          <Link to="/playlist">나의 플레이리스트</Link>
        </Nav>
      </NavWrapper>
    </Header>
  );
};

const Header = styled.header`
  width: 100%;
  height: 60px;
  background-color: #111;
  color: white;
  display: flex;
  align-items: center;
  //position: fixed;
  top: 0;
  z-index: 999;
`;

const NavWrapper = styled.div`
  //max-width: 1024px;
  margin: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
  align-items: center;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
  > a {
    color: white;
    text-decoration: none;
  }
`;

const Logo = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

export default Navbar;
