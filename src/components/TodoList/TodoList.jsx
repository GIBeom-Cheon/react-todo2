//rfc  = function   rafce  = arrow

import React, { useEffect, useState } from "react";
import AddTodo from "../AddTodo/AddTodo";
import Todo from "../Todo/Todo";
import styles from "./TodoList.module.css";

const TodoList = ({ filter }) => {
  //미리 입력해둔 todos가 아니라 이미 저장된 값을 가져온다.
  const [todos, setTodos] = useState(readTodosFromLocalStorage());
  // const [todos, setTodos] = useState([
  //   { id: "123", text: "장보기", status: "active" },
  //   { id: "456", text: "유산소 운동", status: "active" },
  //   { id: "789", text: "붕어빵 구입", status: "active" },
  // ]); //status 는 나중에 진행중/ 완료 구분을 위해

  const handleAdd = (todo) => {
    setTodos([...todos, todo]);
  };

  const handleUpdate = (updated) => {
    setTodos(todos.map((t) => (t.id === updated.id ? updated : t)));
  };

  const handleDelete = (deleted) =>
    setTodos(todos.filter((t) => t.id !== deleted.id));

  const filtered = getFilteredItems(todos, filter); // 필터링해주는 함수실행

  //todos가 업데이트할때 적용
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]); // 비어있는 배열은 화면 실행시 실행,
//JSON.stringify()  객체나 배열을 JSON 문자열로 변환해서 localStorage에 저장
  return (
    <section className={styles.container}>
      <ul className={styles.list}>
        {filtered.map((item) => (
          <Todo
            key={item.id}
            todo={item}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </ul>
      <AddTodo onAdd={handleAdd} />
    </section>
  );
};

//TodoList 컴포넌트 바깥 부분에 필터링하는 함수 정의
function getFilteredItems(todos, filter) {
  if (filter === "all") {
    return todos;
  }
  return todos.filter((todo) => todo.status === filter);
}


//localStorage에 저장된 todos를 가져와서 오브젝트 형식으로 변환, 저장된것 없으면 빈배열
function readTodosFromLocalStorage(){
  const todos = localStorage.getItem("todos");

  return todos ? JSON.parse(todos) : [];
}


export default TodoList;
