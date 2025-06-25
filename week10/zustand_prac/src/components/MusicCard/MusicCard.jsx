import React from "react";
import styled from "styled-components";
import { usePlaylistStore } from "../../store/usePlaylistStore";

const MusicCard = ({ data }) => {
  const { id, title, artist } = data;
  const playlist = usePlaylistStore((state) => state.playlist);
  const addTrack = usePlaylistStore((state) => state.addTrack);

  const isAdded = playlist.some((t) => t.id === id);

  return (
    <Wrapper>
      <Left>
        <Rank>{id}</Rank>
        <TrackInfo>
          <Title>{title}</Title>
          <Artist>{artist}</Artist>
        </TrackInfo>
      </Left>
      <Right>
        <Button onClick={() => addTrack(data)} disabled={isAdded}>
          {isAdded ? "추가됨" : "플레이리스트에 추가"}
        </Button>
      </Right>
    </Wrapper>
  );
};
const TrackInfo = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const Wrapper = styled.div`
  padding: 16px;
  border: 1px solid var(--line-gray);
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4rem;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 4rem;
`;

const Right = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
`;

const Rank = styled.div`
  font-weight: bold;
`;

const Title = styled.div`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Artist = styled.div`
  font-size: 14px;
  color: gray;
`;

const Button = styled.button`
  margin-top: 8px;
  margin-left: 10rem;
`;

export default MusicCard;
