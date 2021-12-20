import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import CoinPage from "./components/CoinPage";
import "./App.css";
import { makeStyles } from "@material-ui/core";
function App() {
  const useStyles = makeStyles(() => ({
    App: {
      backgroundColor: "#14161a",
      color: "white",
      minHeight: "100vh",
    },
  }));

  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
      <Header />
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="coin:id" element={<CoinPage />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
