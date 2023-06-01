from flask import Flask, request, jsonify
import os
import numpy as np
import pickle
from flask_pymongo import PyMongo,ObjectId
from flask_cors import CORS
import pandas as pd
import json
from dotenv import load_dotenv
load_dotenv()
secret_key = os.environ.get("SECRET_KEY")
user=os.environ.get("DB_USER")
pw=os.environ.get("DB_PW")
db=os.environ.get("DB_NAME")




# Init app
app = Flask(__name__)

app.secret_key= secret_key
##app.config['MONGO_URI']="mongodb://192.1.39.189/odfd"
app.config['MONGO_URI']="mongodb+srv://"+user+":"+pw+"@nictc.ok4ic.mongodb.net/"+db+"?retryWrites=true&w=majority"

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


      """Function that performs restaurant recommendations for a user"""
      user_id= request.json['users_id']
      # Load Trained Model
      model = pickle.load(open('model/recommender_model.sav', 'rb'))
      
      # Access data from Db
      data = pd.read_csv('model/raw_ids.csv')
      data_names = pd.read_csv('model/raw.csv')
      
      # Dictionary key value item for restaurants  
      rest_dict = data_names[['restaurant_names','restaurant_id']]
      rest_dict = rest_dict.drop_duplicates()
      rest_dict = rest_dict.set_index('restaurant_id')['restaurant_names'].to_dict()
      
      # Get the list of all restaurants in the dataset
      all_restaurants = data['restaurant_id'].unique()
      
      # Filter the restaurants that the user has already rated
      rated_restaurants = data[data['users_id'] == user_id]['restaurant_id'].values
      unrated_restaurants = list(set(all_restaurants) - set(rated_restaurants))
      
      # Create a list to store the predicted ratings for unrated restaurants
      predicted_ratings = []
      
      # Generate ratings predictions for unrated restaurants
      for restaurant in unrated_restaurants:
          predicted_rating = model.predict(user_id, restaurant).est
          predicted_ratings.append((restaurant, predicted_rating))
                
      # Sort the predicted ratings in descending order
      predicted_ratings.sort(key=lambda x: x[1], reverse=True)
      top_5 = np.array(predicted_ratings[0:6])
      
      # Create and return json
      #top_5 = jsonify(list(top_5[:,0]))
      top_5 = json.dumps(list(top_5[:,0]))

      return jsonify({"results":top_5})

# def createFavourites():
#       id=db.favourites.insert_one({
#         'users_id':request.json['users_id']
#       })
    
#       return jsonify({'message':'Done'})



  


# Run Server
if __name__ == '__main__':
  app.run(debug=True,host='0.0.0.0',port = 5001)

