import React from "react";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import AuthModal from "./Authentication/AuthModal";
import UserSidebar from "./Authentication/UserSidebar";
import {
  AppBar,
  Toolbar,
  Container,
  Typography,
  MenuItem,
  Select,
  makeStyles,
  createTheme,
  ThemeProvider,
  Button,
} from "@material-ui/core";

export default function Header() {
  const { currency, setCurrency, user } = CryptoState();
  //Dark Theme
  const theme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  //Style Header Component
  const useStyles = makeStyles(() => ({
    title: {
      flex: 1,
      fontFamily: "MonteCarlo",
      fontSize: 40,
      color: "gold",
      cursor: "pointer",
    },
  }));

  //Create Object with using userStyles class
  const classes = useStyles();
  //For Home Page Navigation
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.Header}>
        <AppBar position="static" color="transparent">
          <Container color="gold">
            <Toolbar>
              <Typography
                onClick={() => navigate("/")}
                className={classes.title}
                variant="h5"
              >
                Crypto Coin
              </Typography>

              <Select
                variant="outlined"
                style={{
                  width: 100,
                  height: 40,
                  marginRight: 15,
                  color: "white",
                }}
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <MenuItem value={"usd"}>USD</MenuItem>
                <MenuItem value={"bdt"}>BDT</MenuItem>
              </Select>
              {user ? <UserSidebar /> : <AuthModal />}
            </Toolbar>
          </Container>
        </AppBar>
      </div>
    </ThemeProvider>
  );
}
