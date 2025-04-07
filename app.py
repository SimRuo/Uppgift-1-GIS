from flask import Flask, render_template
import json

app = Flask(__name__)

""" Istället för att hålla på att gegga med massa jävla fetchrequests så laddar vi bara in JSON filer här istället och skickar med den till routesen. """

@app.route("/")
def home():
    with open('static/src/supermarket.geojson', 'r', encoding='utf-8') as f:
        supermarket_data = json.load(f)
    with open('static/src/fuel.geojson', 'r', encoding='utf-8') as f:
        fuel_data = json.load(f)
    return render_template("index.html", supermarket_data=supermarket_data, fuel_data=fuel_data)

if __name__ == "__main__":
    app.run(debug=True)
