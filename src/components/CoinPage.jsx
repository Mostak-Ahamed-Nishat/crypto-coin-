import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../config/Api";
import { CryptoState } from "../CryptoContext";
import CoinInfo from "./CoinInfo";
import ReactHtmlParser from "react-html-parser";

function CoinPage() {
  const [coin, setCoin] = useState({});
  const { currency, symbol } = CryptoState();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
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
    description: {
      width: "100%",
      fontFamily: "Montserrat",
      padding: 25,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: "justify",
    },
  }));
  // create Object for style class

  const classes = useStyles();

  useEffect(() => {
    const fetchCoin = async () => {
      setLoading(true);
      const { data } = await axios.get(SingleCoin(id));
      if (data) {
        setCoin(data);
        setLoading(false);
      }
    };
    fetchCoin();
  }, [id]);

  // console.log(coin);

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        {loading
          ? "Loading..."
          : coin?.image?.large && (
              <img
                src={coin.image.large}
                alt={coin.name}
                height="150"
                style={{ marginBottom: 20, marginTop: 30 }}
              />
            )}
        <Typography variant="h3" className={classes.heading}>
          {coin.name}
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
          {ReactHtmlParser(coin?.description?.en.split(".")[0])}
        </Typography>
      </div>
      <CoinInfo coin={coin} />
    </div>
  );
}

export default CoinPage;

{
  /* <div className={classes.sidebar}>
        Coin Image
        {coin?.image?.large && (
          <img
            src={coin.image.large}
            alt={coin.name}
            height="100"
            style={{ marginBottom: 20 }}
          />
        )}
        <Typography variant="h3" className={classes.heading}>
          {coin.name}
        </Typography>
        <Typography></Typography>
      </div> */
}

{
  /* <div className={classes.container}>
{loading ? (
  "Loading..."
) : coin ? (
  <div className={classes.sidebar}>
    Coin Image
    {coin.image.large && (
      <img
        src={coin.image.large}
        alt={coin.name}
        height="100"
        style={{ marginBottom: 20 }}
      />
    )}
    <Typography variant="h3" className={classes.heading}>
      {coin.name}
    </Typography>
    <Typography></Typography>
  </div>
) : (
  "No data"
)}
<h1>Coin Chart </h1>
<CoinInfo coin={coin} />
</div> */
}
