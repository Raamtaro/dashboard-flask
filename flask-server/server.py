from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

data = {
    "columns": ["Name", "Age", "City"],
    "rows": [
        ["Alice", 30, "New York"],
        ["Bob", 25, "Los Angeles"],
        ["Charlie", 35, "Chicago"],
    ]
}

antData = [
    {"id": 1, "name": "John Doe", "age": 28, "city": "New York"},
    {"id": 2, "name": "Jane Doe", "age": 32, "city": "Los Angeles"},
    {"id": 3, "name": "William Smith", "age": 45, "city": "Chicago"}
]

@app.route("/members")
def members():
    return {"members": ["Member1", "Member2", "Member3"]}


@app.route("/peoples")
def peoples():
    return {"peoples": ["People1", "People2", "People3"]}

@app.route("/data")
def get_data():
    return jsonify(data)

@app.route("/antdata")
def get_antData():
    return jsonify(antData)


if __name__ == "__main__":
    app.run(debug=True)