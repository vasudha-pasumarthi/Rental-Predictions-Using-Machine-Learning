from flask import Flask, request
import pickle
import pandas as pd


app = Flask(__name__)

@app.route('/predict/')
def show_user_profile():
    heatingType = request.args.get('heatingType')

    # create an Empty DataFrame object
    data = pd.read_csv("predict.csv")
    
    return '''<h1>The predicted value is: {}</h1>'''.format(predict_score(data, 'GB_Model.pkl'))
    #return '''<h1>The language value is: {}</h1>'''.format(heatingType)

def predict_score(inputs, model_filename):
     # Load the Model back from file
    with open(model_filename, 'rb') as file:  
        model = pickle.load(file)
    return model.predict(inputs)