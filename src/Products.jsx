//무한루프에 빠진 fetch 를 한번만 불러옴
//useEffect() hooks는 react component를 원할때만 실행하게 한다.

import React, { useState } from "react";
import { useEffect } from "react";

export default function () {
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("data/products.json")
      .then((res) => res.json()) // json 함수 호출, 불러온 문서가 제이슨
      .then((data) => {
        console.log("데이터를 네트워크에서 받아왔음.");
        setProducts(data);
      });
    return () => {
      //컴포넌트가 언 마운트 될 때
    };
  }, []); // deps를 비워 놓으면 아무런 디펜던시가 전달되지 않음, 처음에만 실행

  return (
    <>
      <ul>
        {products.map((product) => (
          <li>
            <h3>제품명 : {product.name}</h3>
            <p>가격 : {product.price}</p>
          </li>
        ))}
      </ul>
      <div>
        <button
          style={{ padding: "10px", backgroundColor: "gray" }}
          onClick={() => setCount((prev) => prev + 1)}
        >
          {count}
        </button>
      </div>
    </>
  );
}

/*
  fetch ("api 주소")
  .then(res => res.json())
  .then(res => { // data를 응답 받은 후의 로직})
*/
