import React, { useEffect, useState } from "react";
import axiosInstance from "../libs/axiosInstance";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 2rem;
  margin: auto;
  width: 100vw;
  height: 100vh;
`;

const PostItem = styled.div`
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #f8f8f8;
  cursor: pointer;
`;

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axiosInstance.get("/posts");
        setPosts(res.data);
      } catch (err) {
        setError("❌ 게시글 불러오기 실패");
        console.error(err.response?.data || err.message);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Container>
      <h2 style={{ color: "white" }}>게시글 목록</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {posts.length === 0 ? (
        <p>등록된 게시글이 없습니다.</p>
      ) : (
        posts.map((post) => (
          <PostItem
            key={post.postId}
            onClick={() => navigate(`/posts/${post.postId}`)}
          >
            <h3 style={{ color: "black" }}>{post.title}</h3>
            <p style={{ color: "black" }}>{post.content}</p>
            <p style={{ color: "black" }}>
              작성자:{" "}
              {post.anonymous ? "익명" : post.member?.nickname || "알 수 없음"}
            </p>
            <p style={{ color: "black" }}>
              게시판: {post.board?.title || "N/A"}
            </p>
          </PostItem>
        ))
      )}
    </Container>
  );
};

export default PostList;
