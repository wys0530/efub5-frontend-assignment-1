import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SignUpForm from "./components/SignupForm";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import BoardForm from "./components/BoardForm";
import BoardDetail from "./components/BoardDetail";
import BoardPostList from "./components/BoardPostList";
import PostDetail from "./components/PostDetail";

export default function App() {
  return (
    <Router>
      <nav
        style={{
          padding: "1rem",
          display: "flex",
          justifyContent: "space-evenly",
          gap: "1rem",
        }}
      >
        <Link to="/" style={{ color: "white" }}>
          전체 글 보기
        </Link>
        <Link to="/write" style={{ color: "white" }}>
          글쓰기
        </Link>
        <Link to="/boards/new" style={{ color: "white" }}>
          게시판 생성
        </Link>
        <Link to="/boards/detail" style={{ color: "white" }}>
          게시판 조회
        </Link>
        <Link to="/signup" style={{ color: "white" }}>
          회원가입
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/posts/:postId" element={<PostDetail />} />
        <Route path="/write" element={<PostForm />} />
        <Route path="/boards/new" element={<BoardForm />} />
        <Route path="/boards/detail" element={<BoardDetail />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/boards/:boardId/posts" element={<BoardPostList />} />
      </Routes>
    </Router>
  );
}
