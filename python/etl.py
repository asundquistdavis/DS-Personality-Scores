import pandas as pd
import random as r

def continuous_data_etl(input_path, output_path='../Resources/continuous-data.json', type='json'):
    df = pd.read_csv(input_path)
    dfr = pd.DataFrame()
    dfr['attribute_value'] = df['attribute'].map({'E': 1, 'I': -1})*df['attribute score']
    dfr['function_1_value'] = df['function 1'].map({'N': 1, 'S': -1})*df['function 1 score']
    dfr['function_2_value'] = df['function 2'].map({'F': 1, 'T': -1})*df['function 2 score']
    dfr['lifestyle_value'] = df['lifestyle'].map({'J': 1, 'P': -1})*df['lifestyle score']
    if type == 'json':
        dfr.to_json(output_path)
        return dfr
    else:
        return dfr

def categorical_data_etl(input1_path, input2_path, output_path='../Resources/categorical-data.json', type='json'):
    pts = ['ESTJ', 'ESTP', 'ESFJ', 'ESFP', 'ENTJ', 'ENTP', 'ENFJ', 'ENFP', 'ISTJ', 'ISTP', 'ISFJ', 'ISFP', 'INTJ', 'INTP', 'INFJ', 'INFP']
    
    df1 = pd.read_csv(input1_path)
    df1['type'] = df1['attribute']+df1['function 1']+df1['function 2']+df1['lifestyle']
    pt1 = []
    for pt in pts:
        pt1.append(df1.loc[df1['type']==pt,'type'].count()/100)

    df2 = pd.read_csv(input2_path)
    df2 = df2.loc[df2['Country']=='United States',:]
    pt2 = []
    apts = df2.columns
    for pt in pts:
        ptv = 0
        for apt in apts:
            if (apt.split('-')[0] == pt):
                ptv += df2[apt].values[0]
        pt2.append(ptv)

    dfr = pd.DataFrame({0: pts, 1: pt1, 2: pt2}).T
    dfr.columns =dfr.loc[0,:]
    dfr = dfr.loc[1:2,:]
    if type == 'json':
        dfr.to_json(output_path)
        return dfr
    else:
        return dfr