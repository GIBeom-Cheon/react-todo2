import { useState, createContext } from "react";

export const DarkModeContext = createContext();
//데이터를 Context에 담고 있음(컴포넌트처럼 쓰임)

//데이터를 가지고 보여주고 있는 우산역할(부모 우산 컴포넌트)
export function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  //다크모드인지 아닌지 기억하는 상태/ 초기갑은 다크모드가 아닌 상태
  const toggleDarkMode = () => 
    setDarkMode(!darkMode)
    updateDarkMode(!darkMode);


  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

//컨텍스트(DarkModeProvider)에는 내장 프로퍼티 provider가 있음
// DarkModeContext.Provider를 통해 밸류값 설정


function updateDarkMode(darkMode) {
  if(darkMode){
    document.documentElement.classList.add("dark");
  } else{
    document.documentElement.classList.remove("dark");
  }
}