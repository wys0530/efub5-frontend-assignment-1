import React, { useState } from "react";
import axiosInstance from "../libs/axiosInstance";
import styled from "styled-components";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 300px;
`;

const BoardEditForm = () => {
  const [boardId, setBoardId] = useState(""); // 수정 대상 게시판 ID
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    notice: "",
    ownerId: 38, // 실제 로그인된 사용자 ID
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBoardIdChange = (e) => {
    setBoardId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.put(`/boards/${boardId}`, formData);
      console.log("✅ 수정된 게시판:", res.data);
      setMessage(`✅ 게시판 수정 완료! (${res.data.title})`);
    } catch (err) {
      console.error("❌ 게시판 수정 실패:", err.response?.data || err.message);
      setMessage("❌ 게시판 수정 실패!");
    }
  };

  return (
    <Main>
      <h2>게시판 수정</h2>
      <StyledForm onSubmit={handleSubmit}>
        <input
          type="number"
          name="boardId"
          placeholder="수정할 게시판 ID"
          value={boardId}
          onChange={handleBoardIdChange}
          required
        />
        <input
          type="text"
          name="title"
          placeholder="새 제목"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="새 설명"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="notice"
          placeholder="공지사항"
          value={formData.notice}
          onChange={handleChange}
          required
        />
        <button type="submit">수정하기</button>
      </StyledForm>
      {message && <p style={{ marginTop: "1rem", fontWeight: "bold" }}>{message}</p>}
    </Main>
  );
};

export default BoardEditForm;
