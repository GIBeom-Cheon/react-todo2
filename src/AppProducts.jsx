import React,{useState} from "react";
import Products from "./Products";

export default function AppProducts() {
  const [show, setShow] = useState(true);

  return (
    <div>
      {show && <Products />}
      <button onClick={() => setShow(!show)}>Toggle</button>
    </div>
  );
}
