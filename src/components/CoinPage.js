import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../config/Api";
import { CryptoState } from "../CryptoContext";
import CoinInfo from "./CoinInfo";

function CoinPage() {
  const { id } = useParams();
  const [coin, setCoin] = useState({});
  const { currency, symbol } = CryptoState();

  // create Styles
  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      [theme.breakpoints.down("md")]: {
        flexDirection: " column",
        alignItems: "center",
      },
    },
    sidebar: {
      width: "30%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid gray",
    },
    heading: {
      fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "Montserrat",
    },
  }));

  // create Object for style class
  const classes = useStyles();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  }, []);

  // TEst Data
  console.log(coin.image.large);

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="100"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className={classes.heading}>
          {coin.name}
        </Typography>
      </div>
      <h1>Coin Chart </h1>
      <CoinInfo coin={coin} />
    </div>
  );
}

export default CoinPage;
