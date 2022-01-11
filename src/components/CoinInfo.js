import {
  CircularProgress,
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { HistoricalChart } from "../config/Api";
import { CryptoState } from "../CryptoContext";
//chart
import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { chartDays } from "../config/data";
import SelectButton from "./SelectButton";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

function CoinInfo({ id, coin }) {
  //State
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();

  //Create Theme
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  //Create Style
  const useStyles = makeStyles((theme) => ({
    container: {
      width: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
      marginLeft: 50,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
    },
  }));

  const classes = useStyles();

  //Fetch Data

  const fetchData = async () => {
    const { data } = await axios.get(HistoricalChart(id, days, currency));
    setHistoricalData(data.prices);
    console.log("Real Data =" + data);
  };

  useEffect(() => fetchData(), [currency, days]);

  //Chart Data

  // const data = {
  //   labels: [
  //     "Jan",
  //     "Feb",
  //     "Mar",
  //     "Apr",
  //     "May",
  //     "Jun",
  //     "Jul",
  //     "Aug",
  //     "Sep",
  //     "Oct",
  //     "Nov",
  //     "Dec",
  //   ],
  //   datasets: [
  //     {
  //       label: "# of Votes",
  //       data: [12, 19, 3, 5, 2, 3, 5, 2, 5, 2, 11, 8],
  //       backgroundColor: [
  //         "rgba(255, 99, 132, 0.2)",
  //         "rgba(54, 162, 235, 0.2)",
  //         "rgba(255, 206, 86, 0.2)",
  //         "rgba(75, 192, 192, 0.2)",
  //         "rgba(153, 102, 255, 0.2)",
  //         "rgba(255, 159, 64, 0.2)",
  //       ],
  //       borderColor: [
  //         "rgba(255, 99, 132, 1)",
  //         "rgba(54, 162, 235, 1)",
  //         "rgba(255, 206, 86, 1)",
  //         "rgba(75, 192, 192, 1)",
  //         "rgba(153, 102, 255, 1)",
  //         "rgba(255, 159, 64, 1)",
  //       ],
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  // var options = {
  //   maintainAspectRatio: false,
  // scales: {
  //   y: {
  //     beginAtZero: true,
  //   },
  // },
  //   legend: {
  //     labels: {
  //       fontSize: 26,
  //     },
  //   },
  // };

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div className={classes.container}>
          {/* CHART  */}
          {!historicalData ? (
            <CircularProgress
              style={{ color: "gold" }}
              size={250}
              thickness={1}
            />
          ) : (
            <div>
              <Line
                height={600}
                width={700}
                data={{
                  labels: historicalData.map((coin) => {
                    let date = new Date(coin[0]);
                    let time =
                      date.getHours() > 12
                        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                        : `${date.getMinutes()}:${date.getMinutes()} AM`;

                    return days === 1 ? time : date.toLocaleDateString();
                  }),
                  datasets: [
                    {
                      data: historicalData.map((coin) => coin[1]),
                      label: `Price (Past ${days} Days) in ${currency}`,
                      borderColor: "gold",
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    title: {
                      display: true,
                      text: "Chart.js Line Chart",
                    },
                  },
                  elements: {
                    point: {
                      radius: 1,
                    },
                  },
                }}
              />
              <div
                style={{
                  display: "flex",
                  marginTop: 20,
                  justifyContent: "space-around",
                  width: "100%",
                }}
              >
                {chartDays.map((day) => (
                  <SelectButton
                    key={day.value}
                    onClick={() => setDays(day.value)}
                    selected={day.value === days}
                  >
                    {day.label}
                  </SelectButton>
                ))}
              </div>
            </div>
          )}
        </div>
      </ThemeProvider>
    </div>
  );
}

export default CoinInfo;
