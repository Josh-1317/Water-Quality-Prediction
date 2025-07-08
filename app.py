from flask import Flask, render_template, request, flash, redirect, url_for
import pandas as pd
import joblib

app = Flask(__name__)
app.config["SECRET_KEY"] = "a_secret_key_for_flashing_messages"

# --- Model Loading ---
try:
    model = joblib.load("pollution_model.pkl")
    model_cols = joblib.load("model_columns.pkl")
except FileNotFoundError:
    model = None
    model_cols = []
    print("WARNING: Model or column files not found. The app will not be able to make predictions.")

# --- Helper Function ---
def classify_water_status(predictions):
    """Classifies water quality based on pollutant levels and thresholds."""
    thresholds = {"O2": 4.0, "NO3": 10.0, "NO2": 1.0, "SO4": 200.0, "PO4": 0.1, "CL": 250.0}
    score = sum(predictions.get(k, 0) > thresholds.get(k, float('inf')) for k in thresholds)
    status_levels = ["Clean", "Moderate", "Poor", "Very Poor", "Critical"]
    return status_levels[min(score, len(status_levels) - 1)]

# --- Routes ---
@app.route("/", methods=["GET", "POST"])
def index():
    predictions, quality_status, year, station_id = None, None, None, None
    quality_status_class = ""

    if request.method == "POST":
        if not model:
            flash("Model is not loaded. Cannot make a prediction.", "error")
            return redirect(url_for("index"))

        try:
            year = int(request.form["year"])
        except ValueError:
            flash("Invalid year format. Please enter a valid number.", "error")
            return redirect(url_for("index"))

        station_id = request.form["station_id"]
        
        station_col_name_prefixed = f"id_{station_id}"
        
        # Check if the entered station ID is valid
        if station_col_name_prefixed not in model_cols and station_id not in model_cols:
            flash(f"Station ID '{station_id}' is not a valid ID.", "error")
            return redirect(url_for("index"))

        # Create a DataFrame with all model columns set to 0
        input_encoded = pd.DataFrame(0, index=[0], columns=model_cols)
        input_encoded['year'] = year

        # Set the selected station's column to 1
        if station_col_name_prefixed in input_encoded.columns:
            input_encoded[station_col_name_prefixed] = 1
        else:
            input_encoded[station_id] = 1

        output = model.predict(input_encoded)[0]
        labels = ["O2", "NO3", "NO2", "SO4", "PO4", "CL"]
        predictions = {k: round(float(v), 3) for k, v in zip(labels, output)}

        quality_status = classify_water_status(predictions)
        quality_status_class = quality_status.lower().replace(" ", "-")

    return render_template("index.html",
                           predictions=predictions,
                           quality_status=quality_status,
                           quality_status_class=quality_status_class,
                           year=year,
                           station_id=station_id)

if __name__ == "__main__":
    app.run(debug=True)