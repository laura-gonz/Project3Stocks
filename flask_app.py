from flask import Flask, jsonify
from flask_cors import CORS  # Import Flask-CORS
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
import pandas as pd

app = Flask(__name__)
CORS(app)
engine = create_engine('sqlite:///crypto_data.db')
Session = sessionmaker(bind=engine)
symbol_batch = ['BTC/USD', 'ETH/USD', 'USDT/USD', 'XRP/USD', 
                'BNB/USD', 'ADA/USD', 'SOL/USD', 'DOGE/USD']

@app.route("/")
def welcome():
    """List all available API routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/symbols<br/>"
        f"/api/v1.0/cryptocurrencies<br/>"
        f"/api/v1.0/cryptocurrencies/<symbol>"
    )

@app.route("/api/v1.0/symbols")
def symbols():
    try:
        # Connect to the database
        engine = create_engine("sqlite:///crypto_data.db")
        conn = engine.connect()

        # Get the table names from the database
        query = text("SELECT name FROM sqlite_master WHERE type='table';")
        result = conn.execute(query).fetchall()
        conn.close()

        # Extract the table names from the query result
        tables = [row[0] for row in result]

        return jsonify(tables)

    except Exception as e:
        return f"Error: {str(e)}"

@app.route("/api/v1.0/cryptocurrencies")
def cryptocurrencies():
    """Return all data for all cryptocurrencies."""
    conn = engine.connect()
    crypto_data = {}
    for symbol in symbol_batch:
        table_name = f'{symbol.replace("/", "_")}'
        query = f"SELECT * FROM {table_name}"
        df = pd.read_sql(query, conn)
        crypto_data[symbol] = df.to_dict(orient='records')
    conn.close()
    return jsonify(crypto_data)

@app.route("/api/v1.0/cryptocurrencies/<symbol>")
def cryptocurrency(symbol):
    """Return data for a specific cryptocurrency."""
    conn = engine.connect()
    table_name = f'{symbol.replace("/", "_")}'
    query = f"SELECT * FROM {table_name}"
    df = pd.read_sql(query, conn)
    conn.close()
    return df.to_json(orient='records')

if __name__ == '__main__':
    app.run(debug=True)