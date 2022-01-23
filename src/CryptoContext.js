import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { CoinList } from "./config/Api";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("usd");
  const [symbol, setSymbol] = useState("$");
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  //For ALert toaster message
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });

  //For set the coin list
  const fetchCoin = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };

  // For check user logged in or not

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  //For Currency
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
        user,
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
