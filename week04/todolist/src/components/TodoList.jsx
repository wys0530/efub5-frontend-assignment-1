import React from "react";
import styled from "styled-components";
import TodoItem from "./TodoItem";

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

function TodoList({ todos, setTodos }) {
  //투두 리스트 표시하기
  return (
    <TodoListBlock>
      {todos.map(
        (
          todo //todoItem에 todo의 정보를 전달
        ) => (
          <TodoItem
            id={todo.id} //todo의 id 가져오기
            text={todo.text} //todo의 text 가져오기
            done={todo.done} //todo의 완료 여부 가져오기
            key={todo.id} //todo의 key는 id값. id값 가져오기!
            setTodos={setTodos}
          />
        )
      )}
    </TodoListBlock>
  );
}

export default TodoList;
