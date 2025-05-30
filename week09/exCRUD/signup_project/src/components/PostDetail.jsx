import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../libs/axiosInstance";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { HiThumbUp, HiOutlineThumbUp } from "react-icons/hi";

const Container = styled.div`
  padding: 2rem;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PostBox = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 2rem;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;

  width: 600px;
  height: auto;
  * {
    color: black;
  }

  .info {
    display: flex;
    flex-direction: column;

    gap: 0.3rem;
    color: gray;
    font-size: 14px;
  }

  .userInfo {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 14px;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 1rem;
`;

export default function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ title: "", content: "" });

  const [liked, setLiked] = useState(false);

  const memberId = 38; //멤버 한 명 지정해서 코드 구현함

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axiosInstance.get(`/posts/${postId}`);
        setPost(res.data);
        setError("");
      } catch (err) {
        console.error(err);
        setError("❌ 게시글을 불러오지 못했습니다.");
      }
    };

    fetchPost();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/posts/${postId}`);
      alert("삭제 완료!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("오류 발생: 삭제 실패");
    }
  };

  const handleUpdate = async () => {
    try {
      await axiosInstance.put(`/posts/${postId}`, {
        ...post,
        title: formData.title,
        content: formData.content,
      });
      alert("✅ 수정 완료!");
      setEditMode(false);
      setPost((prev) => ({
        ...prev,
        title: formData.title,
        content: formData.content,
      }));
    } catch (err) {
      console.error(err);
      alert("❌ 수정 실패!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleLike = async () => {
    try {
      console.log("보내는 memberId:", memberId);
      if (liked) {
        await axiosInstance.delete(`/posts/${postId}/hearts`, {
          params: { memberId },
        });
        setLiked(false);
      } else {
        await axiosInstance.post(`/posts/${postId}/hearts`, {
          memberId: memberId,
        });
        setLiked(true);
      }
    } catch (err) {
      console.error("좋아요 처리 실패:", err);
    }
  };

  return (
    <>
      <Container>
        <h2>게시글 상세보기</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {post ? (
          <>
            <PostBox>
              <Link
                to="/"
                style={{
                  fontWeight: "bold",
                  color: "black",
                  marginBottom: "2rem",
                  display: "flex",
                  alignSelf: "flex-start",
                }}
              >
                &lt; 목록으로
              </Link>

              <p className="info"> {post.board?.title || "N/A"} 게시판</p>
              {editMode ? (
                <>
                  <input
                    style={{ color: "white" }}
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                  <div className="userInfo">
                    <p>
                      작성자:{" "}
                      {post.anonymous
                        ? "익명"
                        : post.member?.nickname || "알 수 없음"}
                    </p>
                    <p>{new Date(post.createdDate).toLocaleString()}</p>
                  </div>
                  <hr />
                  <textarea
                    style={{ color: "white" }}
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                  />
                </>
              ) : (
                <>
                  <h3 style={{ marginTop: "1rem" }}>{post.title}</h3>
                  <div className="userInfo">
                    <p>
                      작성자:{" "}
                      {post.anonymous
                        ? "익명"
                        : post.member?.nickname || "알 수 없음"}
                    </p>
                    <p>{new Date(post.createdDate).toLocaleString()}</p>
                  </div>
                  <hr />
                  <p>{post.content}</p>
                </>
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  marginTop: "auto",
                }}
              >
                <button
                  onClick={handleToggleLike}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "20px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    padding: "0",
                    gap: "0.5rem",
                    color: liked ? "dodgerblue" : "gray",
                  }}
                >
                  {liked ? <HiThumbUp /> : <HiOutlineThumbUp />}
                </button>
              </div>
            </PostBox>

            <ButtonContainer>
              {editMode ? (
                <>
                  <button
                    style={{ backgroundColor: "green", color: "white" }}
                    onClick={handleUpdate}
                  >
                    저장
                  </button>
                  <button onClick={() => setEditMode(false)}>취소</button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setFormData({
                        title: post.title,
                        content: post.content,
                      });
                      setEditMode(true);
                    }}
                  >
                    수정
                  </button>
                  <button
                    style={{ backgroundColor: "red", color: "white" }}
                    onClick={handleDelete}
                  >
                    삭제
                  </button>
                </>
              )}
            </ButtonContainer>
          </>
        ) : (
          !error && <p>로딩 중...</p>
        )}
      </Container>
    </>
  );
}
