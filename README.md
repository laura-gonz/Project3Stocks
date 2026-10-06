# Cryptocurrency Analysis Dashboard

A team project completed through the UTSA Data Analytics & Visualization program. The dashboard lets users explore historical prices and technical indicators for eight cryptocurrencies.

## Features

- Select Bitcoin, Ethereum, Tether, XRP, Binance Coin, Cardano, Solana, or Dogecoin.
- Compare opening, closing, high, and low prices.
- Explore Relative Strength Index (RSI) and Moving Average Convergence Divergence (MACD).
- View the latest 52 weekly observations in the saved dataset.

## Tools

- **Python and Pandas:** retrieve and prepare cryptocurrency data.
- **TwelveData API:** provide historical prices and technical indicators.
- **SQLite and SQLAlchemy:** store and query the dataset.
- **Flask:** serve data through API endpoints.
- **JavaScript and Chart.js:** display interactive charts.

## Data Flow

TwelveData API → Pandas DataFrames → SQLite database → Flask API → Chart.js dashboard

The dashboard reads from the included `crypto_data.db`. It does not automatically retrieve live prices.

## Run the Dashboard

### 1. Clone the repository

```bash
git clone https://github.com/laura-gonz/Project3Stocks.git
cd Project3Stocks
```

### 2. Install dependencies

Python 3.11 was used for the original project.

```bash
python -m pip install flask flask-cors sqlalchemy pandas
```

### 3. Start the Flask backend

Run this command from the project directory so Flask can locate the included database:

```bash
python flask_app.py
```

Keep the terminal running. The backend should be available at:

```text
http://127.0.0.1:5000
```

### 4. Open the dashboard

Open the project folder in VS Code and install the **Live Server** extension.

Right-click `index.html` and select **Open with Live Server**. Keep the Flask backend running while exploring the charts.

**No API key is required to view the saved dataset.**

## Optional: Refresh the Dataset

### 1. Install notebook dependencies

```bash
python -m pip install twelvedata jupyter
```

### 2. Supply your own API key

Create a TwelveData account and obtain your own API key.

The notebook’s setup cell prompts for the key and stores it in an environment variable for the current Python session:

```python
import os
import getpass
from twelvedata import TDClient

key = getpass.getpass("Paste your TwelveData API key: ").strip()

if not key:
    raise ValueError("No key was entered.")

os.environ["TWELVEDATA_API_KEY"] = key
td = TDClient(apikey=key)
```

Enter the key at the prompt. Input is hidden.

Do not write your key directly into the notebook, README, or a configuration file.

### 3. Run the notebook

Open `TwelveData.ipynb` from the project directory and run its cells in order.

The notebook retrieves weekly price and indicator data for eight cryptocurrencies. The database-loading step replaces the corresponding tables in `crypto_data.db`.

Request limits and data availability depend on your TwelveData plan. Restart the Flask backend after updating the database.

## Main Files

| File | Purpose |
|---|---|
| `TwelveData.ipynb` | Retrieves data and loads SQLite tables |
| `crypto_data.db` | Saved cryptocurrency dataset |
| `flask_app.py` | Backend API |
| `index.html` | Dashboard page |
| `logic.js` | Interactive chart logic |

## Limitations

- Saved data reflects the last successful refresh.
- Indicator values are supplied by TwelveData.
- The project is an educational prototype and is not investment advice.
- The Flask development server is intended for local use.

## Team

Mark Perry, Alberto Fuentes, and Laura Gonzalez.

Mark’s contribution included data retrieval and preparation, database integration, backend API development, and dashboard implementation.

## Presentation

[View the project presentation](https://docs.google.com/presentation/d/1A818NLMImudR8h7sSqX60PtevVP6c-6bEWukqI5gGsk/edit)