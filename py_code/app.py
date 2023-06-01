from flask import Flask, request, jsonify
import os
import numpy as np
import pickle
from flask_pymongo import PyMongo,ObjectId
from flask_cors import CORS



# Init app
app = Flask(__name__)

app.secret_key= 'acb5efac7654a9f927bf5206a8b52bad5e6eb52d'
#app.config['MONGO_URI']="mongodb://202.1.39.189/odfd"
app.config['MONGO_URI']="mongodb+srv://user:pw@nictc.ok4ic.mongodb.net/db?retryWrites=true&w=majority"

# Set the Stable API version when creating a new client
client = PyMongo(app)
db=client.db
                          
mongo = PyMongo(app)
CORS(app)


# Get All Predictions
@app.route('/top', methods=['GET'])
def get():
  return jsonify({'message':'The top 3 restaurants'})


@app.route('/favourites',methods=['POST'])
def predict_favourites():
      model = pickle.load(open('model/recommender_model.sav', 'rb'))
      name=request.json['users_id']
      print(name)
      prediction = model.predict(name)
      return jsonify({"results":prediction})

# def createFavourites():
#       id=db.favourites.insert_one({
#         'users_id':request.json['users_id']
#       })
    
#       return jsonify({'message':'Done'})



  


# Run Server
if __name__ == '__main__':
  app.run(debug=True,host='0.0.0.0',port = 5001)

