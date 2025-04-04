from flask import Flask, render_template
import json

app = Flask(__name__)

""" Istället för att hålla på att gegga med massa jävla fetchrequests så laddar vi bara in JSON filer här istället och skickar med den till routesen. """

@app.route("/")
def home():
    with open('static/src/supermarket.geojson', 'r', encoding='utf-8') as f:
        geojson_data = json.load(f)
    return render_template("index.html", geojson_data=geojson_data)

if __name__ == "__main__":
    app.run(debug=True)
