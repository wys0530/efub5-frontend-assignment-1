import React from "react";
import "./App.css";
import Home from "./pages/Home";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.color};
    margin: 0;
    padding: 0;
    transition: background-color 0.3s ease, color 0.3s ease;
    
  }

  
`;

const lightTheme = {
  background: "#ffffff",
  color: "#000000",
  cardBackground: "#1e1e1e",
  titleColor: "#f0f0f0",
  genreColor: "#c7c7c7",
  infoColor: "#fff4d5",
};

const darkTheme = {
  background: "#000000",
  color: "#ffffff",
  cardBackground: "#ffffff",
  titleColor: "#111",
  genreColor: "#444",
  infoColor: "#393939",
};

function App() {
  const mode = useSelector((state) => state.theme.mode);
  const currentTheme = mode === "light" ? lightTheme : darkTheme;
  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle />

      <Home />
    </ThemeProvider>
  );
}

export default App;
