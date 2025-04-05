import React, { useState, useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import TodoTemplate from "./components/TodoTemplate";
import TodoHead from "./components/TodoHead";
import TodoList from "./components/TodoList";
import TodoCreate from "./components/TodoCreate";
import styled from "styled-components";

//더미 데이터..
const TODO_LIST = [
  { id: 1, text: "이펍과제하기", done: false },
  { id: 2, text: "푸데푸데 잠자기", done: false },
  { id: 3, text: "숙영리와 온라인 데이트(...)하기^^", done: false },
];

const GlobalStyle = createGlobalStyle`
  body {
    background:rgb(205, 233, 255)
  }
`;

// 로컬 스토리지: 브라우저를 껐다 켜도 저장되어있음.
// 이걸 하려면?
// 1. 앱이 로딩될 때 localStorage에서 todos를 불러온다. 2. todos가 변경될 때마다 localStorage에 저장한다.
const LOCAL_STORAGE_KEY = "todos";

function App() {
  const [todofilter, setFilter] = useState("all"); // all, done , undone 상태 중 전체 보기를 초기값으로 설정
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
    //getItem(key)는 키에 해당하는 값을 받아옴. 저장된 값 로딩! (1번과정)
    //우리가 설정한 키(todos)에 해당하는 값을 받아옴.
    return savedTodos ? JSON.parse(savedTodos) : TODO_LIST;
    //savedTodos가 없으면 도미데이터 반환, 있으면 이 데이터를 배열로 변환함
    //(TODO_LIST 대신 [] 을 쓰면 빈 배열(빈 내용) 반환할 수 있음)
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos)); //JSON.stringify: 자바스크립트의 데이터를 문자열로 바꿈
  }, [todos]); //의존성 배열 todos의 내용물이 바뀔때마다 setItem 호출: todo(key), 값(todos의 값을 문자열로 바꾼 결과)

  const getFilteredTodos = () => {
    if (todofilter === "done") return todos.filter((todo) => todo.done);
    if (todofilter === "undone") return todos.filter((todo) => !todo.done);
    return todos;
  };

  return (
    <>
      <GlobalStyle />

      <TodoTemplate>
        <TodoHead todos={todos} setTodos={setTodos} />
        <TodoList
          todos={getFilteredTodos()}
          setTodos={setTodos}
          todofilter={todofilter}
          setFilter={setFilter}
        />
        <TodoCreate todos={todos} setTodos={setTodos} />
      </TodoTemplate>
    </>
  );
}

export default App;
