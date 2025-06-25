import styled from "styled-components";
import cdImage from "../assets/cdImage.png";
import { usePlaylistStore } from "../store/usePlaylistStore";
import { useState } from "react";

const PlayList = () => {
  const playlist = usePlaylistStore((state) => state.playlist);
  const removeTrack = usePlaylistStore((state) => state.removeTrack);
  const clearPlaylist = usePlaylistStore((state) => state.clearPlaylist);
  const playlistTitle = usePlaylistStore((state) => state.playlistTitle);
  const setPlaylistTitle = usePlaylistStore((state) => state.setPlaylistTitle);

  const [isEditing, setIsEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState(playlistTitle);

  const handleTitleSave = () => {
    setPlaylistTitle(tempTitle.trim() || "나의 플레이리스트");
    setIsEditing(false);
  };

  return (
    <>
      <Wrapper>
        <Left>
          <CD src={cdImage} alt="CD 이미지" />
        </Left>
        <Right>
          <Header>
            {isEditing ? (
              <>
                <TitleInput
                  value={tempTitle}
                  onChange={(e) => setTempTitle(e.target.value)}
                />
                <SaveButton onClick={handleTitleSave}>저장</SaveButton>
              </>
            ) : (
              <>
                <h2>{playlistTitle}</h2>
                <EditButton onClick={() => setIsEditing(true)}>✏️</EditButton>
              </>
            )}
            <button onClick={clearPlaylist}>전체 삭제</button>
          </Header>
          <ListWrapper>
            <Songs>
              {playlist.length === 0 ? (
                <p>
                  아직 곡이 없습니다. 나의 플레이리스트에 곡을 추가해보세요!
                </p>
              ) : (
                <ul>
                  {playlist.map((track, index) => (
                    <li key={track.id}>
                      <TrackLeft>
                        <TrackNumber>{index + 1}</TrackNumber>
                        <TrackInfo>
                          <Title>{track.title}</Title>
                          <Artist>{track.artist}</Artist>
                        </TrackInfo>
                      </TrackLeft>
                      <Button onClick={() => removeTrack(track.id)}>
                        삭제
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </Songs>
          </ListWrapper>
        </Right>
      </Wrapper>
    </>
  );
};

const EditButton = styled.button`
  margin-left: 1rem;
  background: transparent;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
`;

const SaveButton = styled.button`
  margin-left: 1rem;
  background-color: #91cbf0;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
`;

const TitleInput = styled.input`
  font-size: 1.5rem;
  padding: 0.3rem;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const TrackLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0rem;
  margin-left: 17rem;

  h2 {
    font-size: 2rem;
  }

  button {
    font-size: 0%.9;
    color: white;
    padding: 0.5rem;
    margin: 2rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  height: calc(100vh - 72px);
`;

const ListWrapper = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  //align-items: center;
`;

const Left = styled.div`
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #b1e1ff;
  justify-content: flex-start;
  overflow: hidden;
`;

const CD = styled.img`
  width: 800px;
  height: 800px;
  object-fit: cover;
  border-radius: 50%;
  opacity: 0.9;
  transform: translateX(-47%);
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  margin-right: 14rem;
`;

const Songs = styled.div`
  width: 100%;
  padding: 40px;
  background-color: #ffffff5d;
  overflow-y: auto;
  border-radius: 30px;

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 16px;
    display: flex;
  }
`;
const Button = styled.button`
  background-color: #91cbf0;
  border: none;
  cursor: pointer;
  padding: 0.8rem;
  margin-left: auto;
`;

const TrackNumber = styled.div`
  width: 24px;
  margin-right: 16px;
  font-weight: bold;
  text-align: center;
`;

const TrackInfo = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const Title = styled.div`
  font-weight: bold;
  margin-bottom: 4px;
`;

const Artist = styled.div`
  font-size: 14px;
  color: gray;
`;

export default PlayList;
