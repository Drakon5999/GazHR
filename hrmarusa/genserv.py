import re

skill_entities_programer = ['c++', 'go']
skill_entities_modeler = ['python', 'django', 'pandas']
year_entities = ['\d+ лет', 'от года']

types = ['modeler', 'programer']
templates = ['./templates/modeler.txt', './templates/programer.txt']

def read_template(typeid):
    with open(templates[typeid], "r") as f:
        q = f.read()
    return q

def generate_template(txt):
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
    for s in sentences:
        dont_include = False
        
        for sk in skill_entities_programer:
            if s.lower().find(sk) > 0:
                skills.append(sk)
                dont_include = True

        for sk in skill_entities_modeler:
            if s.lower().find(sk) > 0:
                skills.append(sk)
                dont_include = True
        
        for ys in year_entities:
            if len(re.findall(r"("+ys+")", s)) > 0:
                dont_include = True
                for q in re.findall(r"("+ys+")", s):
                    experience.append(q)

        if not dont_include:
            new_texts.append(s)

    warnings = []
    if len(skills) == 0:
        warnings.append('навыки не заполнены', pos_skills_start, pos_skills_end)

    return {
        'id': 57121,
        'description': '. '.join(new_texts),
        'hh' : {
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