import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(autoload_with=engine)

app = Flask(__name__)

# Route to get data from the SQLite database
@app.route('/crypto_data', methods=['GET'])
def get_crypto_data():
    try:
        # Connect to the SQLite database
        connection = sqlite3.connect('crypto_data.db')
        cursor = connection.cursor()

        # Execute a query to fetch data from the database
        cursor.execute('SELECT * FROM crypto_data')

        # Fetch all the rows from the query result
        rows = cursor.fetchall()

        # Close the database connection
        connection.close()

        # Convert the query result to a list of dictionaries
        data = []
        for row in rows:
            data.append({
                'timestamp': row[0],
                'open': row[1],
                'high': row[2],
                'low': row[3],
                'close': row[4],
                'volume': row[5],
                'ema_2': row[6],
                'ema_10': row[7],
                'macd': row[8],
                'macd_signal': row[9],
                'macd_histogram': row[10]
            })

        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)