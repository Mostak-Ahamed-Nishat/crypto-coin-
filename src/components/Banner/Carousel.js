import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import { TrendingCoins } from "../../config/Api";
import { CryptoState } from "../../CryptoContext";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();
  const useStyles = makeStyles(() => ({
    carousel: {
      height: "50%",
      display: "flex",
      alignItems: "center",
    },
    carouselItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      textTransform: "uppercase",
      textDecoration: "none",
    },
  }));
  //Creating obj for style class

  const classes = useStyles();

  // Regex function for add comma in between the price

  // get the trending coin data from the api

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  //Carousel Link for trending coins
  const items = trending.map((coin) => {
    //calculate the profit
    let profit = coin.price_change_percentage_24h >= 0;
    return (
      <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
        <img
          src={coin.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span style={{ underline: "none", marginLeft: 0 }}>
          {coin.symbol} &nbsp;
          <span
            style={{
              color: profit > 0 ? "green" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coin.price_change_percentage_24h.toFixed(2)}
          </span>
        </span>
        <br />
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol}
          {numberWithCommas(coin.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });
  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        disableButtonsControls
        autoPlay={1000}
        animationDuration={1500}
        disableDotsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  );
};

export default Carousel;
