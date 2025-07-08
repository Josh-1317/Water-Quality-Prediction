# 💧 Water Quality Prediction Using Machine Learning

This project focuses on predicting water quality based on various pollutant concentrations using machine learning, with the aim of enabling smarter environmental monitoring and long-term planning. The system uses a MultiOutputRegressor wrapped around an XGBoostRegressor to predict multiple chemical pollutants simultaneously and then classifies water quality levels based on those predictions.

---

## 🧪 Predicted Water Quality Parameters

The model predicts concentrations of the following key water pollutants:

- **NH₄** (Ammonium)  
- **BOD5 (BSK5)** (Biochemical Oxygen Demand over 5 days)  
- **Suspended Solids (Colloids)**  
- **O₂** (Dissolved Oxygen)  
- **NO₃** (Nitrate)  
- **NO₂** (Nitrite)  
- **SO₄** (Sulfate)  
- **PO₄** (Phosphate)  
- **CL** (Chloride)

These values are used to classify water quality into categories such as **Clean, Moderate, Poor, and Very Poor**, based on rule-based thresholds.

---

## ⚙️ Model & Evaluation

- **Algorithm**: XGBoostRegressor inside MultiOutputRegressor
- **Other Models Compared**: Linear Regression, Random Forest, Decision Tree  
- **Best Performing Model**: ✅ XGBoost

### 📊 Evaluation Metrics:

- **R² Score**  
- **Mean Squared Error (MSE)**  

> Performance was consistent and reliable across all pollutants, with XGBoost showing the highest accuracy.

---

## 🌐 Web Application

A Flask-based web application was developed to allow users to input a **Year** and **Station ID** and view:

- 🔢 Real-time predictions of pollutant concentrations  
- 🌈 Water quality classification  
- 📈 Interactive **bar chart** visualization of predicted values  
- 🌑 **Dark mode** toggle using emojis (🌞/🌙)  
- 📥 **Download options**: Export predictions as **CSV** or **PDF** reports  

> 🎯 Built for scalability, ease of use, and visual impact.

---

## 🔮 Future Scope

- 📡 IoT Sensor Integration for real-time water data  
- 🧠 Deep Learning (LSTM/Transformer) for temporal forecasting  
- 🗺️ GIS-based heatmap visualizations  
- 📱 Mobile app with voice input for rural users  
- 🔍 XAI (Explainable AI) to justify predictions

---

## 📁 Project Structure

water_quality_prediction/
│
├── app.py # Flask backend
├── pollution_model.pkl # Trained XGBoost model
├── model_columns.pkl # Encoded input feature structure
├── templates/
│ └── index.html # Frontend interface
├── static/
│ ├── style.css # UI styling
│ └── charts.js # Chart.js visualization


---

## 🔗 Model Access

📦 [Download the Trained Model (XGBoost) →](https://drive.google.com/file/d/1fzg02RD50EbjwT_-xIBFxZQqszbU59w6/view?usp=sharing)

---

## 🎓 Internship Details

- **Internship Type**: AICTE Virtual Internship  
- **Platform**: Edunet Foundation  
- **Sponsor**: Shell  
- **Duration**: June 2025 (4 weeks)  
- **Focus Area**: Artificial Intelligence & Machine Learning in Green Technology

---

## 🙌 Acknowledgements

Thanks to **AICTE**, **Edunet Foundation**, and **Shell** for the opportunity. Special appreciation to mentors and peers for guidance during the model development and deployment phase.

---

## 📬 Contact

**Developer**: Joshikaa K.  
**LinkedIn**: [linkedin.com/in/joshikaa-krishna-moorthy-04978b28a](https://www.linkedin.com/in/joshikaa-krishna-moorthy-04978b28a)  
**Institution**: Sona College of Technology  
