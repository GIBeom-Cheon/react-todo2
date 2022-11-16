import { useEffect } from "react";
import { useContext, createContext, useState } from "react";

const DarkModeContext = createContext(); //아래 훅을 만들었기 때문에 export필요 X

export function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
  setDarkMode(!darkMode);
  updateDarkMode(!darkMode);
  };

  // https://tailwindcss.com > docs > darkmode 중간에 있는 상태유지 부분에서 복사
  // 제일 처음 마운트(로딩) 될때 다크모드인지 아닌지 판단하고 그대로 초기값 설정
  /*
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
}

// Whenever the user explicitly chooses light mode
localStorage.theme = 'light'

// Whenever the user explicitly chooses dark mode
localStorage.theme = 'dark'

// Whenever the user explicitly chooses to respect the OS preference
localStorage.removeItem('theme')
*/

  useEffect(() => {
    const isDark =
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
        // 다크모드 상태를 로컬에서 검사후 변수 idDark에 넣어줌
    setDarkMode(!isDark);
    updateDarkMode(!isDark);
  }, []); // 처음로딩 될때만 작동함

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

//Hooks
export const useDarkMode = () => useContext(DarkModeContext);

function updateDarkMode(darkMode) {
  if (darkMode) {
    document.documentElement.classList.add("dark");
    localStorage.theme = "dark"; // 업데이트 될때마다 로컬 스토리지에 저장
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.theme = "light";
  }
}
