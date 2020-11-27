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
        if txt.find(sk) > 0:
            type_of_resume = 1
            break
    template = read_template(type_of_resume)
    new_texts = []
    for s in sentences:
        dont_include = False
        skills = []
        for sk in skill_entities_programer:
            if txt.find(sk) > 0:
                skills.append(sk)
                dont_include = True
        for sk in skill_entities_modeler:
            if txt.find(sk) > 0:
                skills.append(sk)
                dont_include = True
        experience = []
        for s in year_entities:
            if len(re.findall(r""+year_entities, s)) > 0:
                dont_include = True
                for q in re.finall(r"("+year_entities+")", s):
                    experience.append(q)
        if not dont_include:
            new_texts.append(s)
    return {
        'description': '. '.join(new_texts),
        'skills': skills,
        'experience': experience
    }