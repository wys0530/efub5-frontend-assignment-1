import { Outlet } from "react-router";
import styled from "styled-components";

export const DefaultLayout = () => {
  return (
    <BackDrop>
      <Layout>
        <Outlet></Outlet>
      </Layout>
    </BackDrop>
  );
};

const Layout = styled.main`
  width: 100%;
  margin: 0;
  height: 100%;
  //min-height: calc(100vh - 72px);
  display: flex;
  flex-direction: column;
  //justify-content: center;
  //padding: 16px;
  background-color: #b1e1ff;
`;
const BackDrop = styled.div`
  //width: 100vw;
  height: 94vh;
  // margin-top: 72px;
  //min-height: calc(100vh - 72px);
  //background-color: var(--line-gray);
`;
