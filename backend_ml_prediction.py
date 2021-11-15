from flask import Flask, request
import pickle
import pandas as pd
import numpy as np
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)




# @app.route('/predict/')
# def show_user_profile():
#     heatingType = request.args.get('heatingType')
#     # heatingType = request.args.get('heatingType')
#     # heatingType = request.args.get('heatingType')

#     inputs = []
#     # create an Empty DataFrame object
#     df = pd.DataFrame()
#     # append columns to an empty DataFrame
#     df['regio1'] = ['Nordrhein_Westfalen']
#     df['heatingType'] = ['central_heating']
#     df['newlyConst'] = [False]
#     df['balcony'] = [False]
#     df['hasKitchen'] = [False]
#     df['cellar'] = [True]
#     df['baseRent'] = [595.0]
#     df['livingSpace'] = [86.0]
#     df['condition'] = ['well_kept']
#     df['interiorQual'] = ['normal']
#     df['lift'] = [False]
#     df['typeOfFlat'] = ['ground_floor']
#     df['noRooms'] = [4.0]
#     df['floor'] = [1.0]
#     df['garden'] = [True]
#     df['zipcode'] = [0]
#     print(df)

#     columns = []
#     for cols in df.columns:
#         if df[cols].dtype == 'object':
#             columns.append(cols)

#     print(columns)
#     dummies_feature = pd.get_dummies(df[columns])

#     print(dummies_feature.head())
#     print("**********", dummies_feature.shape)

#     data = pd.concat([df, dummies_feature], axis=1)
#     data.drop(['regio1','heatingType','condition','interiorQual','typeOfFlat'],axis=1,inplace = True)

#     #y = np.log(data['baseRent'])
#     x = data.copy()
#     #x.drop(['baseRent'],axis=1,inplace = True)

    
#     return '''<h1>The predicted value is: {}</h1>'''.format(predict_score(data, 'LR_Model.pkl'))
#     #return '''<h1>The language value is: {}</h1>'''.format(heatingType)

# def predict_score(inputs, model_filename):
#      # Load the Model back from file
#     with open(model_filename, 'rb') as file:  
#         model = pickle.load(file)
#     return model.predict(inputs)

"""  df['regio1'] = [reqParams['region']]
    df['heatingType'] = [reqParams['heatingType']]
    df['newlyConst'] = [reqParams['newlyConst']]
    df['balcony'] = [False]
    df['hasKitchen'] = [False]
    df['cellar'] = [True]
    df['livingSpace'] = [86.0]
    df['condition'] = ['well_kept']
    df['interiorQual'] = ['normal']
    df['lift'] = [False]
    df['typeOfFlat'] = ['ground_floor']
    df['noRooms'] = [4.0]
    df['floor'] = [1.0]
    df['garden'] = [True]
    df['zipcode'] = [reqParams['region']] """


@app.route('/predict/', methods=['GET', 'POST'])
def show_user_profile():
    reqParams = request.get_json();
    
   
    heatingType = request.args.get('heatingType')
    data = pd.read_csv("predict.csv")

    df = pd.DataFrame()
    # append columns to an empty DataFrame
    df['regio1'] = [reqParams['region']]
    df['heatingType'] = [reqParams['heatingType']]
    df['newlyConst'] = [reqParams['newlyConst']]
    df['balcony'] = [reqParams['newlyConst']]
    df['hasKitchen'] = [reqParams['hasKitchen']]
    df['cellar'] = [reqParams['cellar']]
    df['livingSpace'] = [reqParams['livingSpace']]
    df['condition'] = [reqParams['condition']]
    df['interiorQual'] = [reqParams['interiorQual']]
    df['lift'] = [reqParams['lift']]
    df['typeOfFlat'] = [reqParams['typeOfFlat']]
    df['noRooms'] = [reqParams['noRooms']]
    df['floor'] = [reqParams['floor']]
    df['garden'] = [reqParams['garden']]
    #df['zipcode'] = [reqParams['zipcode']]
    if [reqParams['region']]== 'Berlin' or 'Bayern':
        df['zipcode'] = [1]
    else :
        df['zipcode'] = [0]
    print(df)
    #Object as String ['regio1', 'heatingType', 'condition', 'interiorQual', 'typeOfFlat']
    cols = ['regio1', 'heatingType', 'condition', 'interiorQual', 'typeOfFlat']

    for each_col in data.columns:
        #print(each_col)
        for col in cols:
            if col in each_col:
                if df[col][0] in each_col:
                    print("****putting 1***", each_col)
                    data[each_col] = [1]
                else:
                    print("****putting 0***", each_col)
                    data[each_col] = [0]

    for col in df.columns:
        if col not in cols:
            data[col] = [df[col][0]]

    print(data.to_string())

    return '''{}'''.format(predict_score(data, 'GB_Model.pkl'))

def predict_score(inputs, model_filename):
     # Load the Model back from file
    with open(model_filename, 'rb') as file:  
        model = pickle.load(file)
        a = 2.718 ** model.predict(inputs)
        val = a[0]
        b = np.round(val + (val*0.1))
        d = np.round(val - (val*0.1))
    return [d,b]