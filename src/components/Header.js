import React from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Container,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  makeStyles,
  createTheme,
  ThemeProvider,
} from "@material-ui/core";

export default function Header() {
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

    logo: {
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
              >
                Crypto Coin
              </Typography>
              <Select
                variant="outlined"
                style={{
                  width: 100,
                  height: 40,
                  marginLeft: 15,
                  textAlign: "right",
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
