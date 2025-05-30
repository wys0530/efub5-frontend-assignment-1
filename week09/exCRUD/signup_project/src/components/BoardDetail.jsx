import React, { useState } from "react";
import axiosInstance from "../libs/axiosInstance";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

const InputBox = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
  button {
    margin-bottom: 16px;
    padding: 0.75rem 1rem;
  }
`;

const InfoBox = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 400px;
  background-color: #f9f9f9;
  p {
    color: black;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 1rem;
`;

export default function BoardDetail() {
  const navigate = useNavigate();
  const [boardId, setBoardId] = useState("");
  const [board, setBoard] = useState(null);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    notice: "",
  });

  const handleFetch = async () => {
    try {
      const res = await axiosInstance.get(`/boards/${boardId}`);
      setBoard(res.data);
      setFormData({
        title: res.data.title,
        description: res.data.description,
        notice: res.data.notice,
      });
      setError("");
    } catch (err) {
      setBoard(null);
      setError("❌ 게시판을 찾을 수 없습니다.");
      console.error(err);
    }
  };

  const handleUpdate = async () => {
    try {
      await axiosInstance.put(`/boards/${boardId}`, {
        ...formData,
        ownerId: board.ownerId,
      });
      setMessage("✅ 게시판 수정 완료!");
      setEditMode(false);
      handleFetch(); // 갱신된 데이터 재조회
    } catch (err) {
      console.error(err);
      setMessage("❌ 게시판 수정 실패!");
    }
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/boards/${boardId}`);
      setMessage("🗑️ 게시판 삭제 완료!");
      setBoard(null);
    } catch (err) {
      console.error(err);
      setMessage("❌ 게시판 삭제 실패!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Container>
      <h2>📘 게시판 조회</h2>
      <InputBox>
        <input
          style={{ width: "250px" }}
          type="number"
          placeholder="게시판 ID 입력"
          value={boardId}
          onChange={(e) => setBoardId(e.target.value)}
        />
        <button onClick={handleFetch}>조회하기</button>
      </InputBox>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {board && (
        <>
          <InfoBox>
            {editMode ? (
              <>
                <p>
                  <strong>제목:</strong>{" "}
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </p>
                <p>
                  <strong>설명:</strong>{" "}
                  <input
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </p>
                <p>
                  <strong>공지:</strong>{" "}
                  <input
                    name="notice"
                    value={formData.notice}
                    onChange={handleChange}
                  />
                </p>
                <ButtonContainer>
                  <button
                    style={{ backgroundColor: "green" }}
                    onClick={handleUpdate}
                  >
                    저장
                  </button>
                  <button onClick={() => setEditMode(false)}>취소</button>
                </ButtonContainer>
              </>
            ) : (
              <>
                <p>
                  <strong>제목:</strong> {board.title}
                </p>
                <p>
                  <strong>설명:</strong> {board.description}
                </p>
                <p>
                  <strong>공지:</strong> {board.notice}
                </p>
                <p>
                  <strong>소유자 ID:</strong> {board.ownerId}
                </p>
                <p>
                  <strong>생성일:</strong>{" "}
                  {new Date(board.createdDate).toLocaleString()}
                </p>
                <ButtonContainer>
                  <button
                    style={{ backgroundColor: "skyblue" }}
                    onClick={() => setEditMode(true)}
                  >
                    수정
                  </button>
                  <button
                    style={{ backgroundColor: "red", color: "white" }}
                    onClick={handleDelete}
                  >
                    삭제
                  </button>
                </ButtonContainer>
              </>
            )}
          </InfoBox>
          <button
            onClick={() => navigate(`/boards/${board.boardId}/posts`)}
            style={{ width: "400px", color: "white", marginTop: "1rem" }}
          >
            이 게시판의 게시글 보기
          </button>
        </>
      )}
    </Container>
  );
}
