document.addEventListener("DOMContentLoaded", function () {
  const selectCryptocurrency = document.getElementById("cryptocurrency");
  let currentChart; // To keep track of the current chart instance
  let currentRSIChart; // To keep track of the current RSI chart instance
  let currentMACDChart; // To keep track of the current MACD chart instance

  // Function to fetch data for the selected cryptocurrency
  function fetchCryptocurrencyData(cryptoSymbol) {
    return fetch(`http://127.0.0.1:5000/api/v1.0/cryptocurrencies/${cryptoSymbol}`)
      .then(response => response.json());
  }

  // Function to create the chart with the provided data
  function createChart(labels, openPrices, closePrices, highPrices, lowPrices) {
    const ctx = document.getElementById("priceChart").getContext("2d");
    
    // Destroy the previous chart instance if it exists
    if (currentChart) {
      currentChart.destroy();
    }

    // Create the new chart
    currentChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Open Price",
            data: openPrices,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            type: "line",
            fill: false
          },
          {
            label: "Close Price",
            data: closePrices,
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            type: "line",
            fill: false
          },
          {
            label: "High Price",
            data: highPrices,
            backgroundColor: "rgba(255, 206, 86, 0.5)",
            type: "bar"
          },
          {
            label: "Low Price",
            data: lowPrices,
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            type: "bar"
          }
        ]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: `Cryptocurrency Price (Open, Close, High, and Low) - Last 52 Weeks`
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: "Date"
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: "Price"
            }
          }
        }
      }
    });
  }

  
// Function to create the RSI line chart
function createRSIChart(labels, rsiValues) {
const ctx = document.getElementById("rsiChart").getContext("2d");
// Destroy the previous RSI chart instance if it exists
if (currentRSIChart) {
  currentRSIChart.destroy();
}

// Create the new RSI chart
currentRSIChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: labels,
    datasets: [
      {
        label: "Relative Strength Index (RSI)",
        data: rsiValues,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true
      }
    ]
  },
  options: {
    responsive: true,
    title: {
      display: true,
      text: `Relative Strength Index (RSI) - Last 52 Weeks`
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Date"
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "RSI Value"
        },
        suggestedMin: 0, // Set the minimum value of the y-axis to 0
        suggestedMax: 100, // Set the maximum value of the y-axis to 100
        beginAtZero: true // Start the y-axis at zero
      }
    },
    plugins: {
      annotation: {
        annotations: [
          {
            type: "line",
            mode: "horizontal",
            scaleID: "y",
            value: 30,
            borderColor: "rgba(0, 0, 0, 0.15)",
            borderWidth: 1,
            borderDash: [5, 5], // Dashed line style
            label: {
              content: "Oversold < 30",
              enabled: true,
              position: "right"
            }
          },
          {
            type: "line",
            mode: "horizontal",
            scaleID: "y",
            value: 70,
            borderColor: "rgba(0, 0, 0, 0.1)",
            borderWidth: 1,
            borderDash: [5, 5], // Dashed line style
            label: {
              content: "Overbought > 70",
              enabled: true,
              position: "right"
            }
          }
        ]
      }
    }
  }
});
}

// Function to create the MACD chart
function createMACDChart(labels, macdValues, signalValues) {
  const ctx = document.getElementById("macdChart").getContext("2d");
  // Destroy the previous MACD chart instance if it exists
  if (currentMACDChart) {
    currentMACDChart.destroy();
  }

  // Create the new MACD chart
  currentMACDChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "MACD",
          data: macdValues,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          type: "line",
          fill: false
        },
        {
          label: "Signal Line",
          data: signalValues,
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          type: "line",
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: `Moving Average Convergence Divergence (MACD) - Last 52 Weeks`
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: "Date"
          }
        },
        y: {
          display: true,
          title: {
            display: true,
            text: "MACD Value"
          }
        }
      }
    }
  });
}

// Function to update all three charts with new data for the selected cryptocurrency
function updateChartsForCryptocurrency(cryptoSymbol) {
  fetchCryptocurrencyData(cryptoSymbol)
    .then(data => {
      // Parse the data and extract the required fields for all three charts
      const prices = data.map(item => {
        return {
          datetime: new Date(item.datetime),
          open: item.open,
          close: item.close,
          high: item.high,
          low: item.low,
          rsi: item.rsi, // Assuming you have an "rsi" field in your data
          macd: item.macd, // Assuming you have an "macd" field in your data
          signal: item.macd_signal // Assuming you have a "macd_signal" field in your data
        };
      });

      // Sort the data by datetime in ascending order (oldest to newest)
      prices.sort((a, b) => a.datetime - b.datetime);

      // Extract the last 52 weeks' data for all three charts
      const last52Weeks = prices.slice(-52);

      // Prepare data for the price chart
      const priceLabels = last52Weeks.map(item => item.datetime.toLocaleDateString());
      const openPrices = last52Weeks.map(item => item.open);
      const closePrices = last52Weeks.map(item => item.close);
      const highPrices = last52Weeks.map(item => item.high);
      const lowPrices = last52Weeks.map(item => item.low);

      // Create the price chart with the new data
      createChart(priceLabels, openPrices, closePrices, highPrices, lowPrices);

      // Prepare data for the RSI chart
      const rsiLabels = last52Weeks.map(item => item.datetime.toLocaleDateString());
      const rsiValues = last52Weeks.map(item => item.rsi); // Assuming you have an "rsi" field in your data

      // Create the RSI chart with the new data
      createRSIChart(rsiLabels, rsiValues);

      // Prepare data for the MACD chart
      const macdLabels = last52Weeks.map(item => item.datetime.toLocaleDateString());
      const macdValues = last52Weeks.map(item => item.macd); // Assuming you have an "macd" field in your data
      const signalValues = last52Weeks.map(item => item.signal); // Assuming you have a "macd_signal" field in your data

      // Create the MACD chart with the new data
      createMACDChart(macdLabels, macdValues, signalValues);
    })
    .catch(error => console.error("Error fetching data:", error));
}



// Add event listener to the select element to update both charts when the user selects a new cryptocurrency
selectCryptocurrency.addEventListener("change", function () {
  const selectedCryptocurrency = this.value;
  updateChartsForCryptocurrency(selectedCryptocurrency);
});

// Initial chart update with the default selected cryptocurrency (BTC_USD)
updateChartsForCryptocurrency(selectCryptocurrency.value);
});