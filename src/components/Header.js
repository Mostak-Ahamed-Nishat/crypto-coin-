import React from "react";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

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
} from "@material-ui/core";

export default function Header() {
  const { currency, setCurrency } = CryptoState();
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
                defaultValue={"USD"}
                style={{
                  width: 100,
                  height: 40,
                  marginRight: 15,
                  color: "white",
                  value: { currency },
                
                }}
              >
                <MenuItem value={"USD"}>USD</MenuItem>
                <MenuItem value={"TK"}>TK</MenuItem>
              </Select>
            </Toolbar>
          </Container>
        </AppBar>
      </div>
    </ThemeProvider>
  );
}
