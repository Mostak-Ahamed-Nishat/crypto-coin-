import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CoinList } from "../config/Api";
import Banner from "./Banner/Banner";
import { numberWithCommas } from "./Banner/Carousel";
import axios from "axios";
import { CryptoState } from "../CryptoContext";
import {
  Container,
  createTheme,
  LinearProgress,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";

function CoinsTable() {
  //State
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Import State
  const { currency } = CryptoState();
  const fetchCoin = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };

  const { symbol } = CryptoState();

  //Create History Route
  const history = useNavigate();

  //Use effect hooks
  useEffect(() => {
    fetchCoin();
  }, [currency]);

  //Search Functions
  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  //Style class for table
  const useStyles = makeStyles(() => ({
    row: {
      backgroundColor: "#16171a",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#131111",
      },
      fontFamily: "Montserrat",
    },
    pagination: {
      "& .MuiPaginationItem-root": {
        color: "gold",
      },
    },
  }));

  const classes = useStyles();

  //Create Dark Theme
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <Container
          style={{
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            style={{ margin: 35, fontFamily: "Montserrat" }}
          >
            {" "}
            Cryptocurrency Prices by Market Cap{" "}
          </Typography>
          <TextField
            label="Search For a Crypto Currency.."
            variant="outlined"
            style={{ marginBottom: 20, width: "100%" }}
            onChange={(e) => setSearch(e.target.value)}
          />

          <TableContainer>
            {loading ? (
              <LinearProgress style={{ backgroundColor: "gold" }} />
            ) : (
              <Table>
                <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                  <TableRow>
                    {["Coin", "Price", "24h Change", "Market Cap"].map(
                      (head) => (
                        <TableCell
                          style={{
                            color: "black",
                            fontWeight: "700",
                            fontFamily: "Montserrat",
                          }}
                          key={head}
                          align={head === "Coin" ? "" : "right"}
                        >
                          {head}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {handleSearch()
                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                    .map((row) => {
                      const profit = row.price_change_percentage_24h > 0;
                      return (
                        <TableRow
                          onClick={() => history(`/coins/${row.id}`)}
                          className={classes.row}
                          style={{ cursor: "pointer" }}
                          key={row.name}
                        >
                          {/* For Image */}
                          <TableCell
                            component="th"
                            scope="row"
                            style={{ display: "flex", gap: 15 }}
                          >
                            <img
                              src={row?.image}
                              alt={row.name}
                              height="50"
                              style={{ marginBottom: 10 }}
                            />
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <span
                                style={{
                                  textTransform: "uppercase",
                                  fontSize: 22,
                                }}
                              >
                                {row.symbol}
                              </span>
                              <span style={{ color: "darkgrey" }}>
                                {row.name}
                              </span>
                            </div>
                          </TableCell>

                          {/* For Current Price  */}
                          <TableCell align="right">
                            {symbol}{" "}
                            {numberWithCommas(row.current_price.toFixed(2))}
                          </TableCell>

                          <TableCell
                            align="right"
                            style={{
                              color: profit > 0 ? "green" : "red",
                              fontWeight: 500,
                            }}
                          >
                            {profit && "+"}
                            {row.price_change_percentage_24h.toFixed(2)}
                          </TableCell>

                          {/* Market Cap */}
                          <TableCell align="right">
                            {symbol}{" "}
                            {numberWithCommas(
                              row.market_cap.toString().slice(0, -6)
                            )}{" "}
                            M
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            )}
          </TableContainer>

          {/* Table Pagination */}
          <Pagination
            count={(handleSearch()?.length / 10).toFixed(0)}
            style={{
              marginTop: "100",
              display: "flex",
              width: "100%",
              padding: 30,
              justifyContent: "center",
              color: "gold",
            }}
            className={{ ul: classes.pagination }}
            onChange={(_, value) => {
              setPage(value);
              window.scroll(0, 500);
            }}
          />
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default CoinsTable;
