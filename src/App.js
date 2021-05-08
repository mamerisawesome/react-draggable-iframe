import { ThemeProvider } from "@material-ui/core";

import WindowScreen from "./pages/WindowScreen";
import theme from "./theme";

import "./App.css";

const Providers = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};

const App = () => {
  return (
    <Providers>
      <div className="App">
        <header></header>
        <main>
          <WindowScreen />
        </main>
        <footer></footer>
      </div>
    </Providers>
  );
};

export default App;
