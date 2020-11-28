import re
import pandas as pd
import numpy as np
import nltk

nltk.download('punkt')
nltk.download('stopwords')

from itertools import groupby
from typing import List, Optional, Tuple

def html_escape(text):
    # type: (str) -> str
    try:
        from html import escape
    except ImportError:
        from cgi import escape  # type: ignore
    return escape(text, quote=True)

def _colorize(token,  # type: str
              weight,  # type: float
              weight_range,  # type: float
              ):
    # type: (...) -> str
    """ Return token wrapped in a span with some styles
    (calculated from weight and weight_range) applied.
    """
    token = html_escape(token)
    if np.isclose(weight, 0.):
        return (
            '<span '
            'style="opacity: {opacity}"'
            '>{token}</span>'.format(
                opacity=_weight_opacity(weight, weight_range),
                token=token)
        )
    else:
        return (
            '<span '
            'style="background-color: {color}; opacity: {opacity}" '
            'title="{weight:.3f}"'
            '>{token}</span>'.format(
                color=format_hsl(
                    weight_color_hsl(weight, weight_range, min_lightness=0.6)),
                opacity=_weight_opacity(weight, weight_range),
                weight=weight,
                token=token)
        )


def _weight_opacity(weight, weight_range):
    # type: (float, float) -> str
    """ Return opacity value for given weight as a string.
    """
    min_opacity = 0.8
    if np.isclose(weight, 0) and np.isclose(weight_range, 0):
        rel_weight = 0.0
    else:
        rel_weight = abs(weight) / weight_range
    return '{:.2f}'.format(min_opacity + (1 - min_opacity) * rel_weight)


_HSL_COLOR = Tuple[float, float, float]

def weight_color_hsl(weight, weight_range, min_lightness=0.8):
    # type: (float, float, float) -> _HSL_COLOR
    """ Return HSL color components for given weight,
    where the max absolute weight is given by weight_range.
    """
    hue = _hue(weight)
    saturation = 1
    rel_weight = (abs(weight) / weight_range) ** 0.7
    lightness = 1.0 - (1 - min_lightness) * rel_weight
    return hue, saturation, lightness



def format_hsl(hsl_color):
    # type: (_HSL_COLOR) -> str
    """ Format hsl color as css color string.
    """
    hue, saturation, lightness = hsl_color
    return 'hsl({}, {:.2%}, {:.2%})'.format(hue, saturation, lightness)



def _hue(weight):
    # type: (float) -> float
    return 120 if weight > 0 else 0


def get_weight_range(weights):
    # type: (FeatureWeights) -> float
    """ Max absolute feature for pos and neg weights.
    """
    return max_or_0(abs(fw.weight)
                    for lst in [weights.pos, weights.neg]
                    for fw in lst or [])



def remaining_weight_color_hsl(
        ws,  # type: List[FeatureWeight]
        weight_range,  # type: float
        pos_neg,  # type: str
    ):
    # type: (...) -> _HSL_COLOR
    """ Color for "remaining" row.
    Handles a number of edge cases: if there are no weights in ws or weight_range
    is zero, assume the worst (most intensive positive or negative color).
    """
    sign = {'pos': 1.0, 'neg': -1.0}[pos_neg]
    if not ws and not weight_range:
        weight = sign
        weight_range = 1.0
    elif not ws:
        weight = sign * weight_range
    else:
        weight = min((fw.weight for fw in ws), key=abs)
    return weight_color_hsl(weight, weight_range)


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

    html_str = ''

    for s in resume_words:
        word_score = 0
        for v in vacancie_words:
            if (s == v):
                score += 1.0 / key_skills.get(s, 1e6)
                word_score += 1.0 / key_skills.get(s, 1e6)
        html_str += ' ' + _colorize(s, word_score, 1.0)

    z = 1.0/(1.0 + np.exp(-score)) 

    return {'score': z, 'color_html': html_str}