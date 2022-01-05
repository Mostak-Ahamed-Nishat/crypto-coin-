import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import CoinPage from "./components/CoinPage";
import "./App.css";
import { makeStyles } from "@material-ui/core";

function App() {
  //Create a style
  const useStyles = makeStyles(() => ({
    App: {
      backgroundColor: "#14161a",
      color: "white",
      minHeight: "100vh",
    },
  }));
  //Create styles class
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/coins/:id" element={<CoinPage />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
