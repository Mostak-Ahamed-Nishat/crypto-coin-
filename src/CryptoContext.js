import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { CoinList } from "./config/Api";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("usd");
  const [symbol, setSymbol] = useState("$");
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  //Watchlist for user

  const [watchlist, setWatchlist] = useState([]);

  console.log(user);
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

  // For check setWatchList

  useEffect(() => {
    if (user) {
      const coinReference = doc(db, "watchlist", user.uid);
      var unSubscribe = onSnapshot(coinReference, (coin) => {
        if (coin.exists()) {
          setWatchlist(coin.data().coins);
        } else {
          console.log("No Item available");
        }
      });
    }
    return () => unSubscribe;
  }, [user]);

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
        watchlist,
        setWatchlist,
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
