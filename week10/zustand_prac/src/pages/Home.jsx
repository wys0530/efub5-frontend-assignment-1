import styled from "styled-components";
import dummyData from "../model/dummyData";
import MusicCard from "../components/MusicCard/MusicCard";

function Home() {
  return (
    <PageWrapper>
      <ListWrapper>
        <h2>🎵 Music Chart 🎵</h2>
        {dummyData.map((e) => {
          return (
            <li key={e.id}>
              <MusicCard data={e} />
            </li>
          );
        })}
      </ListWrapper>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ListWrapper = styled.ul`
  width: 60%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: #ffffff5d;
  border-radius: 30px;
  padding-bottom: 1rem;
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    list-style: none;
  }

  /* li {
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
  } */

  button {
    background-color: #91cbf0;
    border: none;
    cursor: pointer;
  }
`;

export default Home;
