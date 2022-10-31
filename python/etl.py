import pandas as pd
import random as r

def rough_data(input_path):
    df = pd.read_csv(input_path)
    dfr = pd.DataFrame()
    dfr[['attribute score', 'function 1 score', 'function 2 score', 'lifestyle score']] = df[['EI_score', 'NS_score', 'TF_score', 'PJ_score']]
    df[['_', 'attribute','function 1', 'function 2', 'lifestyle', '__']] = df['Score'].str.split('', expand=True)
    dfr[['attribute','function 1', 'function 2', 'lifestyle']] = df[['attribute','function 1', 'function 2', 'lifestyle']]
    return dfr

def continuous_data_etl(input_path, input_type='csv', output_path='../Resources/continuous-data.json', output_type='json'):
    if input_type == 'df':
        df = input_path
    else:
        df = pd.read_csv(input_path)
    dfr = pd.DataFrame()
    dfr['attribute_value'] = df['attribute'].map({'E': 1, 'I': -1})*df['attribute score']
    dfr['function_1_value'] = df['function 1'].map({'N': 1, 'S': -1})*df['function 1 score']
    dfr['function_2_value'] = df['function 2'].map({'F': 1, 'T': -1})*df['function 2 score']
    dfr['lifestyle_value'] = df['lifestyle'].map({'J': 1, 'P': -1})*df['lifestyle score']
    if output_type == 'df':
        return dfr
    else:
        dfr.to_json(output_path)
        return dfr

def categorical_data_etl(input1_path, input2_path, input_type='csv', output_path='../Resources/categorical-data.json', output_type='json'):
    pts = ['ESTJ', 'ESTP', 'ESFJ', 'ESFP', 'ENTJ', 'ENTP', 'ENFJ', 'ENFP', 'ISTJ', 'ISTP', 'ISFJ', 'ISFP', 'INTJ', 'INTP', 'INFJ', 'INFP']
    
    if input_type == 'df':
        df1 = input1_path
    else:
        df1 = pd.read_csv(input1_path)
    df1['type'] = df1['attribute']+df1['function 1']+df1['function 2']+df1['lifestyle']
    pt1 = [df1.loc[df1['type']==pt, 'type'].count()/len(df1) for pt in pts]

    df2 = pd.read_csv(input2_path)
    df2 = df2.loc[df2['Country']=='United States',:]
    apts = df2.columns
    pt2 = [sum(df2[apt].values[0] for apt in apts if apt.split('-')[0] == pt) for pt in pts]
        
    chi2 = [((s1-s2)*(s1-s2)/s2) for s1, s2 in zip(pt1, pt2)]

    dfr = pd.DataFrame({'personality_type': pts, 'class': pt1, 'usa': pt2, 'chi2': chi2})
    
    if output_type == 'df':
        return dfr
    else:
        dfr.to_json(output_path)
        return dfr