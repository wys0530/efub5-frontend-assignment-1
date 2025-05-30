import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../libs/axiosInstance";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  margin-top: 50px;
  min-height: 100vh;
`;

const PostCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #f2f2f2;
  width: 700px;
  color: black;
`;

export default function BoardPostList() {
  const { boardId } = useParams();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axiosInstance.get(`/boards/${boardId}/posts`);
        setPosts(res.data);
        setError("");
      } catch (err) {
        console.error(err);
        setError("❌ 게시글을 불러오지 못했습니다.");
      }
    };

    fetchPosts();
  }, [boardId]);

  return (
    <Container>
      <h2>게시판 ID {boardId}의 게시글 목록</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {posts.length === 0 ? (
        <p>게시글이 없습니다.</p>
      ) : (
        posts.map((post) => (
          <PostCard key={post.postId}>
            <h3 style={{ color: "black" }}>{post.title}</h3>
            <p style={{ color: "black" }}>{post.content}</p>
            <p style={{ color: "black" }}>
              - 작성자:{" "}
              {post.anonymous ? "익명" : post.member?.nickname || "알 수 없음"}
            </p>
            <p>{new Date(post.createdDate).toLocaleString()}</p>
          </PostCard>
        ))
      )}
    </Container>
  );
}
