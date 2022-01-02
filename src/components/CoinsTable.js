import React, { useEffect, useState } from "react";
import { CoinList } from "../config/Api";
import Banner from "./Banner/Banner";
import axios from "axios";
import { CryptoState } from "../CryptoContext";

function CoinsTable() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currency } = CryptoState();
  const fetchCoin = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchCoin();
  }, [currency]);

  console.log(coins);

  return <div></div>;
}

export default CoinsTable;
