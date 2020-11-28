import re
import pandas as pd
import numpy as np
import nltk

nltk.download('punkt')
nltk.download('stopwords')


from nltk.corpus import stopwords  
from nltk.tokenize import word_tokenize  

stop_words = set(stopwords.words('english')) 

try:
    analyt_vac = pd.read_csv('/app/analyt_vac.csv')
    prog_vac = pd.read_csv('/app/prog_vac.csv')
    design_vac = pd.read_csv('/app/design_vac.csv')
    full_set = pd.concat([analyt_vac,prog_vac,design_vac], \
        ignore_index=True).reset_index(drop=True)
except:
    analyt_vac = pd.read_csv('analyt_vac.csv')
    prog_vac = pd.read_csv('prog_vac.csv')
    design_vac = pd.read_csv('design_vac.csv')
    full_set = pd.concat([analyt_vac,prog_vac,design_vac], \
        ignore_index=True).reset_index(drop=True)

def get_key_skills():
    key_skills = []
    for k in full_set.key_skills:
        if type(eval(k)) is list:
            key_skills.extend(eval(k))
    q = pd.DataFrame({
        'skills':key_skills
    })
    q = q.value_counts()
    com_key_skills = {x[0].strip().lower():q[x] for x in \
        q.index.tolist() if len(x[0].strip())>0}
    return com_key_skills

key_skills = get_key_skills()

year_entities = ['от (\d+)[а-я-]* лет', '(\d+)[а-я-]* лет', 'от года', '(\d+) года', '(\d+) год']

def get_experience(text):
    t = text.lower()
    for s in year_entities:
        q = re.findall(r""+s, t)
        if len(q) > 0:
            return int(q[0])
    return 0

def resume_score(vacancie, resume):
    resume_words = word_tokenize(resume.replace('/', ' '))  
    resume_words = [w.lower() for w in resume_words if (not w in stop_words) and (len(w) > 1)] 
    vacancie_words = word_tokenize(vacancie.replace('/', ' '))  
    vacancie_words = [w.lower() for w in vacancie_words if (not w in stop_words) and (len(w) > 1)] 
    
    a = get_experience(vacancie)
    b = get_experience(resume)

    score = -float(b < a)

    for s in resume_words:
        for v in vacancie_words:
            if (s == v):
                score += 1.0 / key_skills.get(s, 1e6)

    z = 1.0/(1.0 + np.exp(-score)) 

    return {'score': z}