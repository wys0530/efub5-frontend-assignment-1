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
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    nickname: "",
    university: "",
    studentId: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/members", formData);
      setMessage("✅ 회원가입 성공!");
      console.log(res.data);
    } catch (err) {
      setMessage("❌ 회원가입 실패!");
      console.error(err);
    }
  };

  return (
    <Main>
      <h2>회원가입</h2>
      <StyledForm onSubmit={handleSubmit}>
        <label style={{ width: "100%" }}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="이메일"
            required
          />
        </label>
        <label style={{ width: "100%" }}>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="비밀번호"
            required
          />
        </label>
        <label style={{ width: "100%" }}>
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            placeholder="닉네임"
            required
          />
        </label>
        <label style={{ width: "100%" }}>
          <input
            type="text"
            name="university"
            value={formData.university}
            onChange={handleChange}
            placeholder="대학교"
            required
          />
        </label>
        <label style={{ width: "100%" }}>
          <input
            type="text"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            placeholder="학번"
            required
          />
        </label>
        <button type="submit">회원가입</button>
      </StyledForm>
      {message && (
        <p style={{ marginTop: "1rem", fontWeight: "bold" }}>{message}</p>
      )}
    </Main>
  );
}
