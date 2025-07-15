from flask import Flask, jsonify
from flask_cors import CORS

# TESTING
# app = Flask(__name__)
# cors = CORS(app, origins='*')

# @app.route('/api/data', methods=['GET'])
# def get_data():
#     return jsonify(
#        {
#            "users": [
#                "Pedro",
#                "Gustavo",
#                "Jappe",
#                'Lucas',
#                'João',
#            ]
#        }
#     )

# if __name__ == '__main__':
#     app.run(debug=True, port=8080)
