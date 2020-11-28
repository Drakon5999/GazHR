from flask import Flask, request, jsonify
from genserv import generate_template
from resumev import resume_score
app = Flask(__name__)

@app.route('/generate', methods=['GET', 'POST'])
def genvac():
    json_data = request.json
    txt = json_data["text"]
    return jsonify(generate_template(txt))

@app.route('/check', methods=['GET', 'POST'])
def vacanciecheck():
    json_data = request.json
    vacancie = json_data["vacancie"]
    resume = json_data["resume"]
    return jsonify(resume_score(vacancie, resume))

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=7000)
