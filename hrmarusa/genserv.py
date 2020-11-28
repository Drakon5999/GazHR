import re
import pandas as pd
import nltk
import numpy as np


try:
    analyt_vac = pd.read_csv('/app/hrmarusa/analyt_vac.csv')
    prog_vac = pd.read_csv('/app/hrmarusa/prog_vac.csv')
    design_vac = pd.read_csv('/app/hrmarusa/design_vac.csv')

    full_set = pd.concat([analyt_vac,prog_vac,design_vac], \
        ignore_index=True).reset_index(drop=True)
except:
    analyt_vac = pd.read_csv('analyt_vac.csv')
    prog_vac = pd.read_csv('prog_vac.csv')
    design_vac = pd.read_csv('design_vac.csv')

    full_set = pd.concat([analyt_vac,prog_vac,design_vac], \
        ignore_index=True).reset_index(drop=True)

def get_common_skills(df):
    q = []
    for r in df.key_skills.values:
        q.extend([x.strip() for x in r.replace('[','').\
            replace(']','').replace('\'','').split(',')])
    len(np.unique(q))

    q = pd.DataFrame({
        'skills':q
    })
    com_key_skills = [x[0].strip().lower() for x in \
        q.value_counts()[:240].index.tolist() if len(x[0].strip())>0]
    return com_key_skills

def get_similar_vac(txt):
    ss = set([x.strip() for x in txt.split(' ') if len(x.strip()) > 0])
    scores = 0
    q = full_set.apply(lambda r: len(set(r['description'].\
        split(' ')) & ss), axis=1)
    most_sim = np.argsort(q)[-10:][::]
    return full_set.iloc[most_sim]

def get_duties(txt):
    v = get_similar_vac(txt)
    for i in range(10):
        t = v.description.values[i].lower().find('обязанности')
        txt = v.description.values[i][t:].lower()
        if len(txt) < 10:
            continue
        for q in re.findall(r">([^<]{4,})<", txt):
            return q #.capitalize()
    return ""

we_offer = ['Созидательная среда и интересные проекты',
'Работа в команде профессионалов – неравнодушных, активных, \
ответственных за свой результат',
'Конкурентная заработная плата и система премирования, ежегодные бонусы',
'ДМС с первого дня',
'Многочисленные скидки и бонусы от партнеров',
'Возможности для профессионального развития',
'Комфортный офис','Участие в социально-значимых проектах, \
использование новейших технологий в работе']

def get_offer():
    offer = 'Мы предлагаем: \n' + '\n'.join(np.random.choice(we_offer, 3))
    return offer

skill_entities_programer = get_common_skills(prog_vac)
skill_entities_modeler = get_common_skills(analyt_vac)
skill_entities_designer = get_common_skills(design_vac)

year_entities = ['от \d+[а-я-]* лет', '\d+[а-я-]* лет', 'от года', '\d+ года', '\d+ год']
dep_entities = ['отдел','департамент','команд','подразделение','проект']
search_entities = ['ищ','требует','необходим','мы']

types = ['modeler', 'programer']
templates = ['./templates/modeler.txt', './templates/programer.txt']

def read_template(typeid):
    with open(templates[typeid], "r") as f:
        q = f.read()
    return q

def is_search_ent(s):
    for x in search_entities:
        if s.find(x) >= 0:
            return True
    return False

def extract_team(txt):
    s = txt.lower()
    r = ''
    for d in dep_entities:
        if s.find(d) >= 0:
            r = ' '.join([x.strip() for x in s[s.find(d):].split(' ')[:3] \
                if not is_search_ent(x)])
    r = r.replace('команда','команду')
    r = r.replace('проекта','проект')
    if len(r) == 0:
        r = 'новый проект'
    return 'В ' + r

def generate_template(txt):
    team_name = extract_team(txt)

    sentences = txt.split('.')
    type_of_resume = 0
    for sk in skill_entities_programer:
        if txt.lower().find(sk) > 0:
            type_of_resume = 1
            break
    template = read_template(type_of_resume)
    new_texts = []
    experience = []
    skills = []
    pos_skills_start, pos_skills_end = 0,0

    typevac = 'аналитик'            
    for s in sentences:
        dont_include = False
        
        for sk in skill_entities_programer:
            if s.lower().find(sk) > 0:
                skills.append(sk)
                typevac = 'разработчик ' + sk
                dont_include = True
                break

        for sk in skill_entities_modeler:
            if s.lower().find(sk) > 0:
                skills.append(sk)
                dont_include = True
                typevac = 'аналитик'

        for sk in skill_entities_designer:
            if s.lower().find(sk) > 0:
                skills.append(sk)
                dont_include = True
                typevac = 'дизайнер интерфейсов (' + sk + ')'
        
        for ys in year_entities:
            if len(re.findall(r"("+ys+")", s)) > 0:
                dont_include = True
                for q in re.findall(r"("+ys+")", s):
                    experience.append(q)
                    break

            if len(experience) > 0:
                break

        if not dont_include:
            new_texts.append(s)

    duties = get_duties(txt)
    duties_list = []
    if len(duties) > 0:
        duties_list.append('В обязанности входит: ' + duties)

    new_texts = [team_name + ' требуется ' + typevac] + duties_list + new_texts + [get_offer()]
    warnings = []
    if len(skills) == 0:
        warnings.append(('не указаны требуемые навыки', \
            pos_skills_start, pos_skills_end))
    if len(experience) == 0:
        warnings.append(('не указан требуемый опыт работы', \
            pos_skills_start, pos_skills_end))

    return {
        'description': '. '.join(new_texts),
        'hh' : {
            'name': typevac,
            'description': '. '.join(new_texts),
            'skills': skills,
            'experience': experience
        },
        'warnings': [{
            'item': {
                'text':t,
                'pos_start': start,
                'pos_end': end
            }
        } for t,start,end in warnings]
    }