import { LinearProgress, Typography } from "@material-ui/core";
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
      marginLeft: 10,
    },
    description: {
      width: "100%",
      fontFamily: "Montserrat",
      padding: 25,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: "justify",
    },
    marketData: {
      alignSelf: "start",
      padding: 25,
      paddingTop: 10,
      width: "100%",
      //Market Responsive
      [theme.breakpoints.down("md")]: {
        display: "flex",
        justifyContent: "center",
      },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
      },
      [theme.breakpoints.down("xs")]: {
        alignItems: "start",
      },
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
  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  //Return View

  return (
    <div className={classes.container}>
      {loading ? (
        "Loading data..."
      ) : (
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
          <div className={classes.marketData}>
            <span style={{ display: "flex" }}>
              <Typography variant="h5" className={classes.heading}>
                Rank: {coin?.market_cap_rank}
              </Typography>
            </span>
            &nbsp;&nbsp;
            <span style={{ display: "flex" }}>
              <Typography variant="h5" className={classes.heading}>
                Current Price: {symbol}{" "}
                {coin?.market_data?.current_price[currency.toLowerCase()]}{" "}
              </Typography>
            </span>
            &nbsp;&nbsp;
            <span style={{ display: "flex" }}>
              <Typography variant="h5" className={classes.heading}>
                Market Cap: {symbol}{" "}
                {coin?.market_data?.market_cap[currency.toLowerCase()]}
              </Typography>
            </span>
          </div>
        </div>
      )}
      {/* {<CoinInfo coin={coin} id={id} />} */}
      {<CoinInfo id={id} coin={coin} />}
    </div>
  );
}

export default CoinPage;

// &nbsp;&nbsp;
//             <Typography
//               variant="small"
//               style={{ fontFamily: "Montserrat" }}
//               className={classes.heading}
//             >
//               {coin?.market_cap_rank}
//             </Typography>
