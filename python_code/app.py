import json
import numpy as np
from flask import Flask, request, render_template,jsonify
import pickle

#Create an app object using the Flask class. 
app = Flask(__name__)

#Load the trained model. (Pickle file)
model = pickle.load(open('models/model.pkl', 'rb'))
# Get All Predictions
@app.route('/top', methods=['GET'])
def get():
  return jsonify({'message':'The top 3 restaurants'})
@app.route('/')
def home():
    return jsonify({
        "result":"Get endpoint"
    })

@app.route('/predict',methods=['POST'])
def predict():

    int_features = [float(x) for x in request.form.values()] #Convert string inputs to float.
    print(request.form.values())
    features = [np.array(int_features)]  #Convert to the form [[a, b]] for input to the model
    print(features)
    prediction = model.predict(features)  # features Must be in the form [[a, b]]

    output = round(prediction[0], 2)


    return jsonify({"results":output})

if __name__ == "__main__":
    app.run(debug=True,host='0.0.0.0',port = 5001)