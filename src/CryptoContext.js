import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { CoinList } from "./config/Api";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("usd");
  const [symbol, setSymbol] = useState("$");
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const fetchCoin = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    if (currency === "usd") setSymbol("$");
    if (currency === "bdt") setSymbol("৳");
  }, [currency]);

  return (
    <Crypto.Provider
      value={{
        currency,
        symbol,
        setCurrency,
        coins,
        loading,
        fetchCoin,
        alert,
        setAlert,
      }}
    >
      {children}
    </Crypto.Provider>
  );
};
export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
