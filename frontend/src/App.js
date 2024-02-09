import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";

/**
 * App component.
 * @returns {React.ReactNode} App component.
 */
function App() {
  /**
   * Dark theme.
   * @type {Theme}
   */
  const customTheme = createTheme({
    palette: {
      mode: "dark",
    },
    typography: {
      button: {
        textTransform: "none",
      },
    },
  });

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Box id="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
